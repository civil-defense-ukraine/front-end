import { CSSProperties, useMemo } from 'react';
import { News } from '../../types/News';
import styles from './NewsCard.module.scss';
import { getNormalized } from '../../utils/getNormalized';

type Props = {
  newsData: News;
  style?: CSSProperties;
};

export const NewsCard: React.FC<Props> = ({ newsData, style }) => {
  const { id, image, type, title, publicationDate, text } = newsData;
  const date = new Date(publicationDate);
  const titleForLink = getNormalized.link(title);
  const normalizedText = getNormalized.slicedText(text);

  return (
    <article className={styles.container} style={style}>
      <img className={styles.img} src={image} alt={title} loading="lazy" />
      <div className={styles.info}>
        <div className={styles.info__container}>
          <div className={styles.tag}>{type}</div>
          <div className={`${styles.header}`}>
            <h3 className={`${styles.heading} heading--h3`}>
              {`${id} ${getNormalized.title(title)}`}
            </h3>
            <p className={styles.date}> {getNormalized.date(date)} </p>
          </div>
          <p className={styles.mainText}>{normalizedText}</p>
        </div>
        <a
          href={`/news/${titleForLink}`}
          className={`${styles.button} button--withArrow`}
        >
          <p>read more</p>
          <div className="icon icon--arrow button--withArrow-icon"></div>
        </a>
      </div>
    </article>
  );
};

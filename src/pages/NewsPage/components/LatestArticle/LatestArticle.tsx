import styles from './LatestArticle.module.scss';
import { getNormalized } from '../../../../utils/getNormalized';
import { News } from '../../../../types/News';
import { useWidth } from '../../../../hooks/useWidth';
import { useMemo } from 'react';

type Props = {
  newsData: News;
};

export const LatestArticle: React.FC<Props> = ({ newsData }) => {
  const width = useWidth();
  const { id, image, type, title, publicationDate, text } = newsData;
  const date = new Date(publicationDate);
  const titleForLink = getNormalized.link(title);

  const normalizedText = useMemo(() => {
    let maxTextLength = 46 * 6;

    if (width > 832) {
      maxTextLength = 45 * 6;
    }
    if (width > 1250) {
      maxTextLength = 67 * 8;
    }

    return getNormalized.slicedText(text, maxTextLength);
  }, []);


  return (
    <article className={styles.container}>
      <img className={styles.img} src={image} alt={title} loading="lazy" />
      <div className={styles.info}>
        <div className={styles.tag}>{type}</div>
        <div className={`${styles.header}`}>
          <h3 className={`${styles.heading} heading--h3`}>
            {getNormalized.title(title)}
          </h3>
          <p className={styles.date}> {getNormalized.date(date)} </p>
        </div>
        <p className={styles.mainText}>{normalizedText}</p>
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

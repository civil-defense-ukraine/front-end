import styles from './LatestArticle.module.scss';
import { getNormalized } from '../../../../utils/getNormalized';
import { News } from '../../../../types/News';

type Props = {
  newsData: News;
};

export const LatestArticle: React.FC<Props> = ({ newsData }) => {
  const { id, image, type, title, publicationDate, text } = newsData;
  const date = new Date(publicationDate);

  return (
    <article className={styles.container}>
      <img
        onError={e => {
          e.currentTarget.src = require('../../../../imgs/default/news.png');
          e.currentTarget.classList.add(styles.img__default);
        }}
        className={styles.img}
        src={image}
        alt={title}
        loading="lazy"
      />
      <div className={styles.info}>
        <div className={styles.tag}>{type}</div>
        <div className={`${styles.header}`}>
          <h3 className={`${styles.heading} heading--h3`}>
            {getNormalized.title(title)}
          </h3>
          <p className={styles.date}> {getNormalized.date(date)} </p>
        </div>
        <p className={styles.mainText}>{text}</p>
      </div>
    </article>
  );
};

import styles from './LatestArticle.module.scss';
import { getNormalized } from '../../../../utils/getNormalized';
import { News } from '../../../../types/News';
import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  newsData: News;
};

export const LatestArticle: React.FC<Props> = ({ newsData }) => {
  const { image, type, title, publicationDate, text } = newsData;
  const date = new Date(publicationDate);
  const [loaded, setLoaded] = useState(false);

  return (
    <article className={styles.container}>
      <div
        className={classNames(styles.img, {
          skeleton: !loaded,
        })}
      >
        <img
          onError={e => {
            e.currentTarget.src = require('../../../../imgs/default/news.png');
            e.currentTarget.classList.add(styles.img__default);
          }}
          className={styles.img}
          src={image}
          alt={title}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.tag}>{type}</div>
        <div className={`${styles.header}`}>
          <h3 className={`${styles.heading} heading--h3`}>
            {getNormalized.title(title)}
          </h3>
          <p className={styles.date}> {getNormalized.date(date)} </p>
        </div>
        <p className={styles.mainText}>
          {text.split('<br/>').map(textEl => (
            <>
              {textEl} <br />
            </>
          ))}
        </p>
      </div>
    </article>
  );
};

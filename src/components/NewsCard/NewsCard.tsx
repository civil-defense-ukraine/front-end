import React, { CSSProperties } from 'react';
import { News } from '../../types/News';
import styles from './NewsCard.module.scss';
import { getNormalized } from '../../utils/getNormalized';
import { ReadMore } from '../Buttons/ReadMore';
import { useWidth } from '../../hooks/useWidth';

type Props = {
  newsData: News;
  style?: CSSProperties;
};

export const NewsCard: React.FC<Props> = ({ newsData, style }) => {
  const { image, type, title, link, publicationDate, text } = newsData;
  const width = useWidth();
  const date = new Date(publicationDate);
  const normalizedText = getNormalized.slicedText(text);
  console.log('Got Donations For 1 DARS Drone, But Need Twooaaaaaaaaaaaaaaa'.length)

  return (
    <article className={styles.container} style={style}>
      <img
        className={styles.img}
        src={image}
        alt={title}
        loading="lazy"
        onError={e => {
          e.currentTarget.src = require('../../imgs/default/news.png');
          e.currentTarget.classList.add(styles.img__default);
        }}
      />
      <div className={styles.info}>
        <div className={styles.info__container}>
          <div className={styles.tag}>{type}</div>
          <div className={`${styles.header}`}>
            <h3 className={`${styles.heading} heading--h3`}>
              {getNormalized.slicedText(getNormalized.title(title), width <1240 ? 30 : 60)}
          
            </h3>
            <p className={styles.date}> {getNormalized.date(date)} </p>
          </div>
          <p className={styles.mainText}>{normalizedText.split('<br/>').map((textEl) => <React.Fragment key={textEl.slice(5)}>{textEl} <br/></React.Fragment>)}</p>
        </div>
        <ReadMore pathname={`/news/${link}`} />
      </div>
    </article>
  );
};

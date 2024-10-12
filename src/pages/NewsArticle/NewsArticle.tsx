import { Navigate, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './NewsArticle.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LatestNews } from '../../components/LatestNews';
import { getNormalized } from '../../utils/getNormalized';
import { SocialMedia } from '../../components/SocialMedia';
import { News } from '../../types/News';
import { useEffect, useMemo } from 'react';
import { loadNews } from '../../features/newsSlice';
import { loadArticle } from '../../features/articleSlice';
import { Error } from '../../components/Error';

const NewsArticle = () => {
  // const { newsId } = useParams();
  const article = {
    id: 1,
    image: 'imgs/news/image_1.jfif',
    publicationDate: '2020-09-28T12:00:00',
    text: 'Good people truly make the world go round! We are incredibly grateful to the local hospital in Fredericia for once again supporting us with much-needed equipment, and to our amazing supporters who helped Jurij load everything this morning The wheelchairs, medications, and sanitary supplies are now on their way to Ukraine.',
    title: 'News from Denmark',
    type: 'NEWS',
  };
  const { id, image, type, title, publicationDate, text } = article;
  const date = new Date(publicationDate);
  const copyLink = () => {
    const currentLocation = window.location.href;
    navigator.clipboard.writeText(currentLocation);
  };

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <div className={styles.tag}>{type}</div>

        <div className={`${styles.header}`}>
          <h3 className={`${styles.heading} heading--h3`}>
            {`${id} ${getNormalized.title(title)}`}
          </h3>
          <p className={styles.date}> {getNormalized.date(date)} </p>
        </div>
        <img
          className={styles.img}
          src={`../${image}`}
          alt={title}
          loading="lazy"
        />
        <div className={styles.info}>
          <p className={styles.mainText}>{text}</p>
          <div className={styles.share}>
            Share
            <button
              onClick={() => {
                copyLink();
              }}
              className={styles.share__button}
            >
              COPY LINK
            </button>
            <SocialMedia />
          </div>
        </div>
      </article>

      <LatestNews />
    </div>
  );
};

export default NewsArticle;

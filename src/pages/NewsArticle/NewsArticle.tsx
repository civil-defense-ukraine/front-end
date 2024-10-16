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
  const { newsId } = useParams();
  const dispatch = useAppDispatch();
  if (!newsId) {
    return <p>No such article</p>
  }

  if (newsId) {
    return <p>{newsId}</p>
  }
  const { article } = useAppSelector(state => state.article);

  if (!article) {
    return <p>No such article</p>
  }

  useEffect(() => {
    dispatch(loadArticle(newsId.split('-').join('%')));
  }, []);
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

import { useParams } from 'react-router-dom';
import styles from './NewsArticle.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LatestNews } from '../../components/LatestNews';
import { getNormalized } from '../../utils/getNormalized';
import { SocialMedia } from '../../components/SocialMedia';
import { News } from '../../types/News';
import { useEffect, useMemo, useRef, useState } from 'react';
import { loadArticle } from '../../features/articleSlice';
import { Error } from '../../components/Error';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import classNames from 'classnames';
import { sortNewsByDate } from '../../utils/getSortedNews';

const NewsArticle = () => {
  const { newsId } = useParams();
  const { news } = useAppSelector(state => state.news);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const copyButton = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  if (!newsId) {
    return <p>No such article</p>;
  }

  useEffect(() => {
    dispatch(loadArticle(newsId));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setCopied(false);
    
  }, [newsId]);

  const { article, loading, error } = useAppSelector(state => state.article);
  const recentArticles = useMemo(() => {
    const latestNewsToDisplay = news.filter((newsItem) => {
      if (article) {
        return newsItem.id !== article.id;
      }

      return true;
    });
    
    return latestNewsToDisplay.sort(sortNewsByDate).slice(0, 10);
  }, [article, news])

  if (loading) {
    return <LoadingPage />;
  }

  if (!loading && (!article || error)) {
    return <Error />;
  }

  const { image, type, title, publicationDate, text } = article as News;
  const date = new Date(publicationDate);
  const copyLink = () => {
    const currentLocation = window.location.href;
    navigator.clipboard.writeText(currentLocation).then(() => {
      if (copyButton.current) {
        setCopied(true);
      }
    });
  };

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <div className={styles.tag}>{type}</div>

        <div className={`${styles.header}`}>
          <h3 className={`${styles.heading} heading--h2`}>
            {`${getNormalized.title(title)}`}
          </h3>
          <div className={styles.date}>
            <div className={styles.date__icon}>
              <div className={`icon icon--small icon--calendar`}></div>
            </div>
            <p> {getNormalized.date(date)} </p>
          </div>
        </div>
        <div
          className={classNames(styles.img, {
            skeleton: !loaded,
          })}
        >
          <img
            className={styles.img}
            onLoad={() => setLoaded(true)}
            src={image}
            alt={title}
            loading="lazy"
          />
        </div>
        <p className={styles.mainText}>
          {text.split('<br/>').map(textEl => (
            <>
              {textEl} <br />
            </>
          ))}
        </p>
        <div className={`heading--h3 ${styles.share}`}>
          Share
          <button
            ref={copyButton}
            onClick={copyLink}
            
            className={`${styles.share__button}`}
          >
            {!copied ? 'COPY LINK' : 'COPIED'}
          </button>
          <SocialMedia />
        </div>
      </article>

      <LatestNews newsToDisplay={recentArticles} />
    </div>
  );
};

export default NewsArticle;

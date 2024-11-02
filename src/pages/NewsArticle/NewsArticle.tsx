import { useParams } from 'react-router-dom';
import styles from './NewsArticle.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LatestNews } from '../../components/LatestNews';
import { getNormalized } from '../../utils/getNormalized';
import { SocialMedia } from '../../components/SocialMedia';
import { News } from '../../types/News';
import { useEffect, useRef, useState } from 'react';
import { loadArticle } from '../../features/articleSlice';
import { Error } from '../../components/Error';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import classNames from 'classnames';

const NewsArticle = () => {
  const { newsId } = useParams();
  const [loaded, setLoaded] = useState(false);
  if (!newsId) {
    return <p>No such article</p>;
  }

  const dispatch = useAppDispatch();
  const copyButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch(loadArticle(newsId.split('-').join('%20')));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [newsId]);

  const { article, loading, error } = useAppSelector(state => state.article);

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
        copyButton.current.classList.add('copyLink--coppied');
      }
    });
  };

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <div className={styles.tag}>{type}</div>

        <div className={`${styles.header}`}>
          <h3 className={`${styles.heading} heading--h3`}>
            {`${getNormalized.title(title)}`}
          </h3>
          <p className={styles.date}> {getNormalized.date(date)} </p>
        </div>
        <div className={styles.article__container}>
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
          <div className={styles.info}>
            <p className={styles.mainText}>
              {text.split('<br/>').map(textEl => (
                <>
                  {textEl} <br />
                </>
              ))}
            </p>
            <div className={styles.share}>
              Share
              <button
                ref={copyButton}
                onClick={() => {
                  copyLink();
                }}
                onTransitionEnd={() => {
                  if (copyButton.current) {
                    copyButton.current.classList.remove('copyLink--coppied');
                  }
                }}
                className={`${styles.share__button} copyLink`}
              >
                COPY LINK
              </button>
              <SocialMedia />
            </div>
          </div>
        </div>
      </article>

      <LatestNews />
    </div>
  );
};

export default NewsArticle;

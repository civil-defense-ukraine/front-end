import { useLocation } from 'react-router-dom';
import styles from './NewsPage.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadNews } from '../../features/newsSlice';
import { NewsCatalog } from './components/NewsCatalog';
import { LatestArticle } from './components/LatestArticle';

export const NewsPage = () => {
  const { pathname } = useLocation();
  const { news, latestSingleNews, loading, error } = useAppSelector(
    state => state.news,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadNews());
  }, []);

  console.log(news);

  return (
    <section className={styles.container}>
      <h2 className={`${styles.heading} heading--h3`}>Latest Article</h2>
      {latestSingleNews && <LatestArticle newsData={latestSingleNews} />}
      <NewsCatalog news={news} />
    </section>
  );
};

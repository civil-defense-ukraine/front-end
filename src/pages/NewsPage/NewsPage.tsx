import { useLocation } from 'react-router-dom';
import styles from './NewsPage.module.scss';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { NewsCatalog } from './components/NewsCatalog';
import { LatestArticle } from './components/LatestArticle';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { Error } from '../../components/Error';
import { getFilteredNews } from '../../utils/getFilteredNews';

const NewsPage = () => {
  const { pathname } = useLocation();
  const [category, setCategory] = useState('');
  const { news, loading, error } = useAppSelector(state => state.news);

  const displayedNews = useMemo(() => {
    if (pathname.slice(1) === 'reports') {
      return getFilteredNews(news, 'reports');
    }

    return getFilteredNews(news, category);
  }, [pathname, news, category]);

  const numberOfPages = useMemo(() => Math.ceil(news.length / 10), [news]);

  return (
    <section className={styles.container}>
      <h2 className={`${styles.heading} heading--h3`}>Latest Article</h2>
      {displayedNews[0] && <LatestArticle newsData={displayedNews[0]} />}
      {loading && <Loader />}
      {!loading && error && <Error />}
      {!loading && !error && (
        <>
          <NewsCatalog news={displayedNews} />
          {numberOfPages >= 2 && <Pagination numberOfPages={numberOfPages} />}
        </>
      )}
    </section>
  );
};

export default NewsPage;

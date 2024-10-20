import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './NewsPage.module.scss';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { NewsCatalog } from './components/NewsCatalog';
import { LatestArticle } from './components/LatestArticle';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { Error } from '../../components/Error';
import { getFilteredNews } from '../../utils/getFilteredNews';
import { Filter } from './components/Filter/Filter';
import { LoadingPage } from '../LoadingPage/LoadingPage';

const NewsPage = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { news, loading, error } = useAppSelector(state => state.news);

  const displayedNews = useMemo(() => {
    const category = searchParams.get('category') || 'all';
    const sortBy = searchParams.get('sortBy') || 'newest';
    const latestArticleId = news[0] ? news[0].id : 0;

    if (pathname.slice(1) === 'reports') {
      return getFilteredNews({news, category:'reports', sortBy, latestArticleId});
    } else {
      return getFilteredNews({news, category, sortBy, latestArticleId});
    }
  }, [pathname, news, searchParams]);
  console.log(displayedNews);

  const numberOfPages = useMemo(() => Math.ceil(news.length / 10), [news]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!loading && error) {
    return <Error />;
  }

  return (
    <section className={styles.container}>
      {news[0] && (
        <>
          <h2 className={`${styles.heading} heading--h3`}>Latest Article</h2>
          <LatestArticle newsData={news[0]} />
        </>
      )}
      {pathname === '/news' && <Filter />}
      <NewsCatalog news={displayedNews} />
      {numberOfPages >= 2 && <Pagination numberOfPages={numberOfPages} />}
    </section>
  );
};

export default NewsPage;

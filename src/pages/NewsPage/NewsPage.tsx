import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './NewsPage.module.scss';
import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { NewsCatalog } from './components/NewsCatalog';
import { LatestArticle } from './components/LatestArticle';
import { Pagination } from '../../components/Pagination';
import { Error } from '../../components/Error';
import { getFilteredNews } from '../../utils/getFilteredNews';
import { Filter } from './components/Filter/Filter';
import { SkeletonNewsCard } from '../../components/NewsCard/SkeletonNewsCard';
import { SkeletonNewsCatalog } from './components/NewsCatalog/SkeletonNewsCatalog';

const NewsPage = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { news, loading, error } = useAppSelector(state => state.news);

  const latestArticle = useMemo(() => {
    if (pathname.includes('reports')) {
      return getFilteredNews({ news, category: 'reports' })[0];
    } else {
      return news[0];
    }
  }, [news, pathname]);

  const displayedNews = useMemo(() => {
    const category = searchParams.get('category') || 'all';
    const sortBy = searchParams.get('sortBy') || 'newest';
    const latestArticleId = latestArticle ? latestArticle.id : 0;

    if (pathname.slice(1) === 'reports') {
      return getFilteredNews({
        news,
        category: 'reports',
        sortBy,
        latestArticleId,
      });
    } else {
      return getFilteredNews({ news, category, sortBy, latestArticleId });
    }
  }, [pathname, news, searchParams]);

  const numberOfPages = useMemo(
    () => Math.ceil(displayedNews.length / 12),
    [displayedNews],
  );

  console.log(displayedNews.length, numberOfPages);

  if (!loading && error) {
    return <Error />;
  }

  return (
    <section className={styles.container}>
      <h2 className={`${styles.heading} heading--h3`}>Latest Article</h2>
      <section className={styles.latestArticle}>
        {loading ? (
          <SkeletonNewsCard showInRow={true} />
        ) : (
          <LatestArticle newsData={latestArticle} />
        )}
      </section>
      {pathname === '/news' && <Filter />}
      {loading ? (
        <SkeletonNewsCatalog />
      ) : (
        <>
          <NewsCatalog news={displayedNews} />
          {numberOfPages >= 2 && <Pagination numberOfPages={numberOfPages} />}
        </>
      )}
    </section>
  );
};

export default NewsPage;

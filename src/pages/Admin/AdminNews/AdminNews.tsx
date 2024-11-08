import { useMemo } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { AdminNewsCard } from './components/AdminNewsCard';
import { AdminCatalog } from '../components/AdminCatalog/AdminCatalog';
import { NewsForm } from './components/NewsForm';
import { useSearchParams } from 'react-router-dom';
import { getFilteredNews } from '../../../utils/getFilteredNews';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import { Error } from '../../../components/Error';
import { getVisibleItems } from '../../../utils/getVisibleItems';
const newsColumns = ['Title', 'Type', 'Date', 'Image', 'Text'];

const AdminNews = () => {
  const { news, loading, error } = useAppSelector(state => state.news);
  const [searchParams] = useSearchParams();

  const displayedNews = useMemo(() => {
    const category = searchParams.get('type') || '';
    const query = searchParams.get('query') || '';
    return getFilteredNews({ news, category, query });
  }, [searchParams, news]);

  const visibleNews = useMemo(() => {
    const page = searchParams.get('page');

    return getVisibleItems({ items: displayedNews, page, itemsPerPage: 8 });
  }, [searchParams, displayedNews]);

  const numberOfPages = useMemo(() => {
    return Math.ceil(displayedNews.length / 8);
  }, [displayedNews]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <AdminCatalog columns={newsColumns} numberOfPages={numberOfPages}>
        {visibleNews.map(item => (
          <AdminNewsCard item={item} key={item.id} />
        ))}
      </AdminCatalog>
      <NewsForm />
    </>
  );
};

export default AdminNews;

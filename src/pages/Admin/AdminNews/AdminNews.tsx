import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AdminNewsCard } from './components/AdminNewsCard';
import { AdminCatalog } from '../AdminCatalog/AdminCatalog';
import { loadNews } from '../../../features/newsSlice';
import { NewsForm } from '../AdminForm';
import { useSearchParams } from 'react-router-dom';
import { getVisibleNews } from '../../../utils/getVisibleNews';
const newsColumns = ['Title', 'Type', 'Date', 'Image', 'Text'];

const AdminNews = () => {
  const { news } = useAppSelector(state => state.news);
  const [searchParams] = useSearchParams();
  const numberOfPages = useMemo(() => {
    return Math.ceil(news.length / 15);
  }, [news]);
  const visibleNews = useMemo(() => {
    const page = searchParams.get('page');

    return getVisibleNews({ news: news, page });
  }, [searchParams, news]);

  console.log(news);

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
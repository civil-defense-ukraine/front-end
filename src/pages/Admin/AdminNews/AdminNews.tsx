import { useMemo } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { AdminNewsCard } from './components/AdminNewsCard';
import { AdminCatalog } from '../AdminCatalog/AdminCatalog';
import { NewsForm } from '../AdminForm';
import { useSearchParams } from 'react-router-dom';
import { getVisibleNews } from '../../../utils/getVisibleNews';
import { getFilteredNews } from '../../../utils/getFilteredNews';
const newsColumns = ['Title', 'Type', 'Date', 'Image', 'Text'];

const AdminNews = () => {
  const { news } = useAppSelector(state => state.news);
  const [searchParams] = useSearchParams();

  const displayedNews = useMemo(() => {
    const category = searchParams.get('type') || '';
    const query = searchParams.get('query') || '';
    return getFilteredNews({ news, category, query });
  }, [searchParams, news]);

  const visibleNews = useMemo(() => {
    const page = searchParams.get('page');

    return getVisibleNews({ news: displayedNews, page });
  }, [searchParams, displayedNews]);

  const numberOfPages = useMemo(() => {
    return Math.ceil(displayedNews.length / 10);
  }, [displayedNews]);

  // function handleSubmit(formField) {
  //   const formData = new FormData();
  //   const restdata = {
  //     title: formField.title,
  //     text: formField.text,
  //     type: formField.type,
  //     publicationDate: new Date(formField.publicationDate).toISOString(),
  //   };

  //   formData.append(
  //     'requestDto',
  //     new Blob([JSON.stringify(restdata)], { type: 'application/json' }),
  //   );

  //   if (formField.image) {
  //     formData.append('image', formField.image);
  //   }
  // }

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

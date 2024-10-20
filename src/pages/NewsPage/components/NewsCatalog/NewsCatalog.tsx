import { useSearchParams } from 'react-router-dom';
import { NewsCard } from '../../../../components/NewsCard';
import { News } from '../../../../types/News';
import styles from './NewsCatalog.module.scss';
import { useMemo } from 'react';
import { getVisibleNews } from '../../../../utils/getVisibleNews';

type Props = {
  news: News[];
};

export const NewsCatalog: React.FC<Props> = ({ news }) => {
  const [searchParams] = useSearchParams();
  const visibleNews = useMemo(() => {
    const page = searchParams.get('page');

    return getVisibleNews({ news: news.slice(1), page });
  }, [searchParams.get('page'), news]);

  console.log(visibleNews);

  return (
    <article className={styles.container}>
      {visibleNews.map(singleNews => (
        <NewsCard newsData={singleNews} key={singleNews.id} />
      ))}
    </article>
  );
};

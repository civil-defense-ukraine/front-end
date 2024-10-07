import { useSearchParams } from 'react-router-dom';
import { News } from '../../../../types/News';
import styles from './Pagination.module.scss';
import { useMemo } from 'react';

export const Pagination = (news: News[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 0);
  const numberOfPages = Math.ceil(news.length / 10);
  const getPages = useMemo(() => { }, []);

  

  return (<div></div>)
}
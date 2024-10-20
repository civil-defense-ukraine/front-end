import { News } from '../types/News';
type Props = {
  news: News[];
  itemsPerPage?: number;
  page?: string | null;
};

export const getVisibleNews = ({ news, itemsPerPage = 10, page }: Props) => {
  const pageNumber = page ? +page : 1;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = (pageNumber - 1) * itemsPerPage + itemsPerPage;

  return news.slice(startIndex, endIndex);
};

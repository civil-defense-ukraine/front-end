import { News } from "../types/News";
type Props = {
  news: News[], 
  itemsPerPage?: number,
  page?: string | null
}

export const getVisibleNews = ({news, itemsPerPage = 10, page}: Props )=> {
  const pageNumber = page ? +page : 0;
  const startIndex = pageNumber * itemsPerPage;
  const endIndex = pageNumber * itemsPerPage + itemsPerPage;
  
  return news.slice(startIndex, endIndex);
}
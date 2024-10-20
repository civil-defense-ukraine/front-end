import { News } from '../types/News';
import { sortNewsByDate } from './getSortedNews';
type Props = {
  news: News[];
  category: string;
  query?: string;
  sortBy?: string;
  latestArticleId?: number;
};

export const getFilteredNews = ({
  news,
  category,
  sortBy,
  latestArticleId,
}: Props) => {
  const filtered = news
    .filter(article => {
      const normalizedType = article.type.toLowerCase();

      if (latestArticleId && article.id === latestArticleId) {
        return false;
      }
      switch (category.toLowerCase()) {
        case 'reports':
          return normalizedType === 'report';
        case 'events':
          return normalizedType === 'event';
        case 'news':
          return normalizedType === 'news';
        default:
          return true;
      }
    })
    .sort(sortNewsByDate);

  return sortBy === 'latest' ? filtered.reverse() : filtered;
};

// export const getFilteredNewsWithQuerty = (news: News[], query: string) => {
//   return  
// };

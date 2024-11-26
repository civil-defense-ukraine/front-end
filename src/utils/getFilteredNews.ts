import { News } from '../types/News';
import { getNormalized } from './getNormalized';
import { sort } from './sortItems';
type Props = {
  news: News[];
  category: string;
  query?: string;
  sortBy?: string;
  latestArticleId?: number | null;
};

export const getFilteredNews = ({
  news,
  category,
  query = '',
  sortBy = '',
  latestArticleId = null,
}: Props) => {
  let filteredNews = news
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
    .sort(sort.newsByDate);

  if (query) {
    filteredNews = filteredNews.filter(newsArticle => {
      const normalizedQuery = query.toLowerCase();
      const normalizedTitle = newsArticle.title.toLowerCase();
      const normalizedText = newsArticle.text.toLowerCase();
      const normaliedDate = getNormalized.dateForAdmin(
        new Date(newsArticle.publicationDate),
      );

      return (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedText.includes(normalizedQuery) ||
        normaliedDate.includes(normalizedQuery)
      );
    });
  }

  return sortBy === 'oldest' ? filteredNews.reverse() : filteredNews;
};

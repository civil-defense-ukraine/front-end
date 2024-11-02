import { News } from '../types/News';
import { sortNewsByDate } from './getSortedNews';
import { getNormalized } from './getNormalized';
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
  query = '',
  sortBy = '',
  latestArticleId = 0,
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
    .sort(sortNewsByDate);

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

  return sortBy === 'latest' ? filteredNews.reverse() : filteredNews;
};

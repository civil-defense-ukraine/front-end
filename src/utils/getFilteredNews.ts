import { News } from '../types/News';

export const getFilteredNews = (news: News[], category: string) => {
  return news.filter(article => {
    const normalizedType = article.type.toLowerCase();
    switch (category) {
      case 'reports':
        return normalizedType === 'report';
      case 'event':
        return normalizedType === 'event';
      case 'announcements':
        return normalizedType === 'announcement';
      default:
        return true;
    }
  });
};

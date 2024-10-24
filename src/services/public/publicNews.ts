import { News } from '../../types/News';
import { publicClient } from '../../utils/httpPublicClient';

export const publicNews = {
  async get() {
    return publicClient.get<News[]>('news');
  },
  async getArticle(id: string) {
    return publicClient.get<News[]>(`news/search?title=${id}`);
  },
};

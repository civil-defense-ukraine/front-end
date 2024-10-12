import { News } from '../types/News';
import { client } from '../utils/httpClient';

export const news = {
  async get() {
    return client.get<News[]>('news.json');
  },
  async getArticle(id: string) {
    return client.get<News[]>('news.json').then(news => {
      const article = news.find(article => article.link === id);
      console.log(article);

      if (!article) {
        throw new Error('Such article doesn`t exist!');
      }

      return article;
    });
  },
};

import { News } from '../../types/News';
import { adminClient } from '../../utils/httpAdminClient';

export const adminNews = {
  async get() {
    return adminClient.get<News[]>('news');
  },
  async delete(id: string) {
    return adminClient.delete<News>(`news/${id}`);
  },
  async post(data: Omit<News, 'id'>) {
    return adminClient.post<News>(`news`, data);
  },
  async update(data: News) {
    return adminClient.update(`news/${data.id}`, data);
  },
};

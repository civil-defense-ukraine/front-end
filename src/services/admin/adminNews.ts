import { News } from '../../types/News';
import { adminClient } from '../../utils/httpAdminClient';

export const adminNews = {
  async get(token: string) {
    return adminClient.get<News[]>('news', token);
  },
  async delete(id: string, token: string) {
    return adminClient.delete<News>(`news/${id}`, token);
  },
  async post(data: FormData, token: string) {
    return adminClient.post<News>(`news`, token, data);
  },
  async update(id: number, data: FormData, token: string) {
    return adminClient.update(`news/${id}`, token, data);
  },
};

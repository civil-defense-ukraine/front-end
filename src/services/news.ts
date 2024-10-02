import { News } from "../types/News";
import { client } from "../utils/httpClient"

export const news = {
  async get() {
    return client.get<News[]>('news.json');
  }

}
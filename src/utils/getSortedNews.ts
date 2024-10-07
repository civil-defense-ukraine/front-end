import { News } from '../types/News';

export const sortNewsByDate = (news1: News, news2: News) => {
  const date1 = new Date(news1.publicationDate);
  const date2 = new Date(news2.publicationDate);

  if (date1 > date2) {
    return -1;
  }
  if (date1 < date2) {
    return 1;
  }

  return 0;
};

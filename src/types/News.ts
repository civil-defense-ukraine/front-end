export type News = {
  id: number;
  image: string;
  type: NewsTypes;
  title: string;
  publicationDate: string;
  text: string;
  link: string;
};

export type NewsTypes = 'report' | 'event' | 'announcement' | 'news';

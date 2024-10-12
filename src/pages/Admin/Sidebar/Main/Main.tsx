import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import styles from './Main.module.scss';
import { loadNews } from '../../../../features/newsSlice';

export const Main = () => {
  const columns = ['Title', 'Date', 'Image', 'Text'];
  const dispatch = useAppDispatch();
  const { news } = useAppSelector(state => state.news);

  useEffect(() => {
    dispatch(loadNews());
  }, []);

  console.log(news);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <input type="text" name="" id="" />
        <button>NEW ITEM</button>
      </div>
      <table>
        <thead>
          <tr className={styles.item}>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {news.map(newsItem => {
            const { id, image, type, title, text, publicationDate } = newsItem;

            return (
              <tr className={styles.item}>
                <td className={styles.item__title}>{title}</td>
                <td className={styles.item__date}>{publicationDate}</td>
                <td >
                  <div className={styles.item__img} style={{ backgroundImage: image }}></div>{' '}
                </td>
                <td className={styles.item__text}>{text}</td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

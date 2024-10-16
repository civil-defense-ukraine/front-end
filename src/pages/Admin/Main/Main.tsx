import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from './Main.module.scss';
import { loadNews } from '../../../features/newsSlice';
import { getNormalized } from '../../../utils/getNormalized';
import { AdminContext } from '../../../context/AdminContext';
import classNames from 'classnames';

export const Main = () => {
  const columns = ['Title', 'Date', 'Image', 'Text'];
  const dispatch = useAppDispatch();
  const { news } = useAppSelector(state => state.news);
  const { selectedItem, setSelectedItem, setDisplayForm } =
    useContext(AdminContext);

  useEffect(() => {
    dispatch(loadNews());
  }, []);

  console.log("We're excited to let you know ...".length);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <label className={styles.header__search}>
          <div
            className={`${styles.header__search__icon} icon icon--small icon--search`}
          ></div>
          <input
            className={`${styles.header__search__field} formField`}
            type="text"
            name=""
            id=""
            placeholder="Search..."
          />
        </label>

        <button
          className={`${styles.searchButton} button--yellow button--secondary`}
          onClick={() => setDisplayForm(true)}
        >
          NEW ITEM
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {news.map(newsItem => {
            const { id, image, type, title, text, publicationDate } = newsItem;
            const formatedDate = new Intl.DateTimeFormat(['ban', 'id']).format(
              new Date(publicationDate),
            );
            return (
              <tr
                className={classNames(`${styles.item}`, {
                  [styles.item__selected]:
                    selectedItem && selectedItem.id === id,
                })}
                key={id}
              >
                <td>
                  <p className={styles.item__title}>{title}</p>
                </td>
                <td>
                  <p className={styles.item__date}>{formatedDate}</p>
                </td>
                <td>
                  <div
                    className={styles.item__img}
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                </td>
                <td>
                  <p className={styles.item__text}>
                    {getNormalized.slicedText(text, 35)}
                  </p>
                </td>
                <td>
                  <div
                    className={styles.button}
                    onClick={() => {
                      setSelectedItem(newsItem);
                      setDisplayForm(true);
                    }}
                  >
                    <div className="icon icon--edit icon--small"></div>{' '}
                    <p>Edit</p>
                  </div>
                </td>
                <td>
                  <div className={styles.button}>
                    <div className="icon icon--delete icon--small"></div>{' '}
                    <p>Delete</p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

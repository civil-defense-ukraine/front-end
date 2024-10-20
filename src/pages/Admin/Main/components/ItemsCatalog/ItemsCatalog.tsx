import classNames from 'classnames';
import styles from './ItemsCatalog.module.scss';
import { useContext, useMemo } from 'react';
import { AdminContext } from '../../../../../context/AdminContext';
import { getNormalized } from '../../../../../utils/getNormalized';
import { useParams, useSearchParams } from 'react-router-dom';

type Props = {
  columns: string[];
  items: any[];
};

export const ItemsCatalog: React.FC<Props> = ({ columns, items }) => {
  const { selectedItem, setSelectedItem, setDisplayForm, setServiceFunctions } =
    useContext(AdminContext);
  const [searchParams] = useSearchParams();
  const { category } = useParams();

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map(item => {
          const { id, image, type, title, text, publicationDate } = item;
          const formatedDate = new Intl.DateTimeFormat(['ban', 'id']).format(
            new Date(publicationDate),
          );
          return (
            <tr
              className={classNames(`${styles.item}`, {
                [styles.item__selected]: selectedItem && selectedItem.id === id,
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
                    setSelectedItem(item);
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
  );
};

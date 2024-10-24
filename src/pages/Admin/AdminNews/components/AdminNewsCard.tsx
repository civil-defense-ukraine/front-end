import classNames from 'classnames';
import { News } from '../../../../types/News';
import styles from '../../AdminCatalog/AdminCatalog.module.scss';
import { useContext } from 'react';
import { FormContext } from '../../../../context/FormContext';
import { getNormalized } from '../../../../utils/getNormalized';
import { adminNews } from '../../../../services/admin/adminNews';
import { AuthContext } from '../../../../context/AuthContext';

type Props = {
  item: News;
};

export const AdminNewsCard: React.FC<Props> = ({ item }) => {
  const { selectedItem, setDisplayForm, setSelectedItem } =
    useContext(FormContext);
  const { token } = useContext(AuthContext);
  const { id, image, type, title, text, publicationDate } = item;
  const formatedDate = new Intl.DateTimeFormat(['ban', 'id']).format(
    new Date(publicationDate),
  );

  const handleDelete = (id: number) => {
    adminNews.delete(id.toString(), token);
  };
  return (
    <tr
      className={classNames(`${styles.item}`, {
        [styles.item__selected]: selectedItem && selectedItem.id === id,
      })}
      key={id}
    >
      <td className={styles.item__title}>{title}</td>
      <td>
        <p className={styles.item__type}>{type}</p>
      </td>
      <td className={styles.item__date}>{formatedDate}</td>
      <td>
        <div
          className={styles.item__img}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </td>
      <td className={styles.item__text}>
        {getNormalized.slicedText(text, 35)}
      </td>
      <td className={styles.button}>
        <div
          className={styles.item__button}
          onClick={() => {
            setSelectedItem(item);
            setDisplayForm(true);
          }}
        >
          <div className="icon icon--edit icon--small"></div> <p>Edit</p>
        </div>
      </td>
      <td className={styles.button}>
        <div
          className={styles.item__button}
          onClick={() => {
            handleDelete(id);
          }}
        >
          <div className="icon icon--delete icon--small"></div> <p>Delete</p>
        </div>
      </td>
    </tr>
  );
};

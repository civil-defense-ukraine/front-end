import classNames from 'classnames';
import { News } from '../../../../types/News';
import styles from '../../AdminCatalog/AdminCatalog.module.scss';
import { useContext, useState } from 'react';
import { FormContext } from '../../../../context/FormContext';
import { getNormalized } from '../../../../utils/getNormalized';
import { adminNews } from '../../../../services/admin/adminNews';
import { AuthContext } from '../../../../context/AuthContext';
import { createPortal } from 'react-dom';
import { Modal } from '../../components/Modal';
import { useAppDispatch } from '../../../../app/hooks';
import { newsSlice } from '../../../../features/newsSlice';

type Props = {
  item: News;
};

export const AdminNewsCard: React.FC<Props> = ({ item }) => {
  const { selectedItem, setDisplayForm, setSelectedItem } =
    useContext(FormContext);
  const { token } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { id, image, type, title, text, publicationDate } = item;
  const formatedDate = new Intl.DateTimeFormat(['ban', 'id']).format(
    new Date(publicationDate),
  );
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: number) => {
    adminNews.delete(id.toString(), token).then(() => {
      dispatch(newsSlice.actions.delete(id));
    });
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
        <div className={styles.item__button} onClick={() => setShowModal(true)}>
          <div className="icon icon--delete icon--small"></div> <p>Delete</p>
        </div>
        {showModal && (
          <>
            {createPortal(
              <Modal
                onDelete={() => {
                  handleDelete(id);
                }}
                onClose={() => setShowModal(false)}
              />,
              document.body,
            )}
          </>
        )}
      </td>
    </tr>
  );
};

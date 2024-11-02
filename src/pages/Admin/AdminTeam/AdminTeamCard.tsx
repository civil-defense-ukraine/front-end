import classNames from 'classnames';
import styles from '../AdminCatalog/AdminCatalog.module.scss';
import { useContext, useState } from 'react';
import { FormContext } from '../../../context/FormContext';
import { AuthContext } from '../../../context/AuthContext';
import { TeamMember } from '../../../types/TeamMember';
import { adminTeam } from '../../../services/admin/adminTeam';
import { createPortal } from 'react-dom';
import { Modal } from '../components/Modal';
import { useAppDispatch } from '../../../app/hooks';
import { teamSlice } from '../../../features/teamSlice';
import { getNormalized } from '../../../utils/getNormalized';

type Props = {
  item: TeamMember;
};

export const AdminTeamCard: React.FC<Props> = ({ item }) => {
  const { selectedItem, setDisplayForm, setSelectedItem } =
    useContext(FormContext);
  const { token } = useContext(AuthContext);
  const { id, image, name, position, description } = item;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    adminTeam.delete(id.toString(), token);
    dispatch(teamSlice.actions.delete(id));
  };
  return (
    <tr
      className={classNames(`${styles.item}`, {
        [styles.item__selected]: selectedItem && selectedItem.id === id,
      })}
      key={id}
    >
      <td className={styles.item__title}>{name}</td>
      <td>
        <div
          className={styles.item__img}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </td>
      <td className={styles.item__role}>{position}</td>
      <td className={styles.item__text}>
        {getNormalized.slicedText(description, 150)}
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
            setShowModal(true);
          }}
        >
          <div className="icon icon--delete icon--small"></div> <p>Delete</p>
        </div>
        {showModal && (
          <>
            {createPortal(
              <Modal
                onDelete={() => {
                  handleDelete(id);
                  setShowModal(false);
                }}
                onClose={() => setShowModal(false)}
              />,
              document.body,
            )}{' '}
          </>
        )}
      </td>
    </tr>
  );
};

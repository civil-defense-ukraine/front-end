import classNames from 'classnames';
import styles from '../AdminCatalog/AdminCatalog.module.scss';
import { useContext } from 'react';
import { FormContext } from '../../../context/FormContext';
import { AuthContext } from '../../../context/AuthContext';
import { TeamMember } from '../../../types/TeamMember';
import { adminTeam } from '../../../services/admin/adminTeam';

type Props = {
  item: TeamMember;
};

export const AdminTeamCard: React.FC<Props> = ({ item }) => {
  const { selectedItem, setDisplayForm, setSelectedItem } =
    useContext(FormContext);
  const { token } = useContext(AuthContext);
  const { id, image, name, position, description } = item;

  const handleDelete = (id: number) => {
    adminTeam.delete(id.toString(), token);
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
      <td className={styles.item__text}>{description}</td>
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

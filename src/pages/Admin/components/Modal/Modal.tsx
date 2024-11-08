import styles from './Modal.module.scss';
type Props = {
  onDelete: () => void;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ onDelete, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__container}>
        <div className={styles.modal__top}>
          <p>Delete Item</p>
          <div className="icon icon--close icon--small" onClick={onClose}></div>
        </div>
        <p>
          Are you sure about deleting this item? Please be aware that this
          action cannot be undone.
        </p>
        <div className={styles.modal__buttons}>
          <div
            className=" button button--secondary button--transparent"
            onClick={onClose}
          >
            <p>Cancel</p>
            <div className="icon icon--medium icon--goBack"></div>
          </div>
          <div
            className=" button button--secondary button--yellow"
            onClick={onDelete}
          >
            <p>Delete</p>
            <div className="icon icon--medium icon--bin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

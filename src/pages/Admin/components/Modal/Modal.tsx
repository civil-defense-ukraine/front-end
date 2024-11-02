import { useEffect } from 'react';
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
            className="button--secondary button--transparent"
            onClick={onClose}
          >
            Cancel
          </div>
          <div className="button--secondary button--yellow" onClick={onDelete}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

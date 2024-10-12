import { Link } from 'react-router-dom';
import styles from './ReadMore.module.scss';
type Props = {
  pathname: string;
};

export const ReadMore: React.FC<Props> = ({ pathname }) => {
  return (
    <Link to={`${pathname}`} className={styles.arrowButton}>
      <p>read more</p>
      <div className={`${styles.arrowButton__icon} icon icon--arrow`}></div>
    </Link>
  );
};

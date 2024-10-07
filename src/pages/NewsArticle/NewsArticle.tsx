import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './NewsArticle.module.scss';

export const NewsArticle = () => {
  return (
    <div className={styles.container}>
      <Breadcrumbs />
    </div>
  );
};

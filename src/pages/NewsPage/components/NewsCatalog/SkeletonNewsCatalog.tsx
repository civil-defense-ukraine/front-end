import styles from './NewsCatalog.module.scss';
import { SkeletonNewsCard } from '../../../../components/NewsCard/SkeletonNewsCard';

export const SkeletonNewsCatalog = () => {
  return (
    <article className={styles.container}>
      {new Array(12).fill('*').map((value, index) => (
        <SkeletonNewsCard key={index} />
      ))}
    </article>
  );
};

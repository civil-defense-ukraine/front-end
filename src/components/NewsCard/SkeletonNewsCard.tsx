import classNames from 'classnames';
import styles from './NewsCard.module.scss';

type Props = { showInRow?: boolean };

export const SkeletonNewsCard: React.FC<Props> = ({ showInRow = false }) => {
  return (
    <article
      className={classNames(`${styles.cardSkeleton} ${styles.container}`, {
        [styles.cardSkeleton__row]: showInRow,
      })}
    >
      <div className={`${styles.img} skeleton`}></div>
      <div className={styles.cardSkeleton__info}>
        <div className={`${styles.cardSkeleton__tag} skeleton`}></div>
        <div className={`${styles.cardSkeleton__text} skeleton`}></div>
        <div className={`${styles.cardSkeleton__text} skeleton`}></div>
        <div className={`${styles.cardSkeleton__text} skeleton`}></div>
        <div className={`${styles.cardSkeleton__text} skeleton`}></div>
      </div>
    </article>
  );
};

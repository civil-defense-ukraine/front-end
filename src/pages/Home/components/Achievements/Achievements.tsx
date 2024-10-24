import { useElementOnScreen } from '../../../../hooks/useElementOnScreen';
import { CounterUpPage } from './CounterUpPage';
import styles from './Achievements.module.scss';

export const Achievements = () => {
  const { isVisible, container } = useElementOnScreen();

  return (
    <section
      ref={container}
      className={`${styles.container} hide--bottom ${isVisible && 'show'}`}
    >
      <div className={styles.container__bg}>
        <h2 className="heading--h2"> Our Achievements</h2>
        {isVisible && (
          <article className={styles.items}>
            <div className={`${styles.item} ${styles.item__first}`}>
              <CounterUpPage endValue={10000} />
              <div className={`${styles.item__icon} icon icon--medium icon--support`}></div>
              <p className={styles.item__text}>People trusted us and made donation</p>
              
            </div>
            <div className={styles.item}>
              <CounterUpPage endValue={200} />
              <div className={`${styles.item__icon} icon icon--medium icon--requests`}></div>
              <p className={styles.item__text}>
                Requests were fullfiled
              </p>
            </div>
            <div className={`${styles.item} ${styles.item__last}`}>
              <CounterUpPage endValue={1000000} />
              <div className={`${styles.item__icon} icon icon--medium icon--helmet`}></div>
              <p className={styles.item__text}>Danish Krones were raised for the Ukrainian defenders</p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

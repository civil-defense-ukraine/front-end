import { useElementOnScreen } from '../../../../hooks/useElementOnScreen';
import { CounterUpPage } from './CounterUpPage';
import styles from './Achievements.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const Achievements = () => {
  const { isVisible, container } = useElementOnScreen();

  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = require('../../../../imgs/achievements-bg.jpg');
    img.onload = () => setBgImageLoaded(true);
  }, []);

  return (
    <section
      ref={container}
      className={classNames(`${styles.container} hide--bottom`, {
        show: isVisible,
        [styles.container__bgImg]: bgImageLoaded,
      })}
    >
      <div className={styles.container__bg}>
        <h2 className="heading--h2"> Our Achievements</h2>
        {isVisible && (
          <article className={styles.items}>
            <div className={`${styles.item} ${styles.item__first}`}>
              <CounterUpPage endValue={10000} />
              <div
                className={`${styles.item__icon} icon icon--medium icon--support`}
              ></div>
              <p className={styles.item__text}>
                People trusted us and made donation
              </p>
            </div>
            <div className={styles.item}>
              <CounterUpPage endValue={200} />
              <div
                className={`${styles.item__icon} icon icon--medium icon--requests`}
              ></div>
              <p className={styles.item__text}>Requests were fullfiled</p>
            </div>
            <div className={`${styles.item} ${styles.item__last}`}>
              <CounterUpPage endValue={1000000} />
              <div
                className={`${styles.item__icon} icon icon--medium icon--helmet`}
              ></div>
              <p className={styles.item__text}>
                Danish Krones were raised for the Ukrainian defenders
              </p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

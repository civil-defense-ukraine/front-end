import { useElementOnScreen } from '../../../../hooks/useElementOnScreen';
import styles from './Donate.module.scss';

export const Donate = () => {
  const { isVisible, container } = useElementOnScreen();

  return (
    <section ref={container} className={styles.container} id={'donate'}>
      <h2
        className={`${styles.heading} heading--h1 hide--left ${isVisible ? 'show' : ''}`}
      >
        Each support makes difference. Together we make Ukrainian victory
        closer!
      </h2>
      <img
        src="./imgs/mobilePay.png"
        loading="lazy"
        alt="mobile pay"
        className={`${styles.img} hide--right ${isVisible ? 'show' : ''}`}
      />
    </section>
  );
};

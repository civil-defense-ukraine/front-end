import { useLocation } from 'react-router-dom';
import { useElementOnScreen } from '../../hooks/useElementOnScreen';
import { Breadcrumbs } from '../Breadcrumbs';
import styles from './Donate.module.scss';
import classNames from 'classnames';

export const Donate = () => {
  const { isVisible, container } = useElementOnScreen();
  const { pathname } = useLocation();

  return (
    <section ref={container} className={styles.wrapper} id={'donate'}>
      {pathname === '/donate' && (
        <div className={styles.breadcrumbs}>
          <Breadcrumbs />
        </div>
      )}
      <div
        className={classNames(`${styles.container}`, {
          [styles.container__page]: pathname === '/donate',
        })}
      >
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
      </div>
    </section>
  );
};

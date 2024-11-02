import { HashLink } from 'react-router-hash-link';
import { useElementOnScreen } from '../../../../hooks/useElementOnScreen';
import styles from './Header.module.scss';
import { SocialMedia } from '../../../../components/SocialMedia';
import { useEffect, useState } from 'react';

export const Header = () => {
  const { isVisible, container } = useElementOnScreen();

  const [bgImageLoaded, setBgImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = require('../../../../imgs/header-bg-tablet.png');
    img.onload = () => setBgImageLoaded(true);
  }, []);

  return (
    <header
      className={`${styles.header} ${styles.backgroundContainer} ${bgImageLoaded ? styles.loaded : ''}`}
    >
      <section className={styles.header__main}>
        <SocialMedia />
        <h2
          ref={container}
          className={`${styles.header__title} heading--h2 hide--left ${!isVisible ? '' : 'show'}`}
        >
          We are a charitable organization that raises funds for the people of
          Ukraine who are defending our country.
        </h2>
        <p
          className={`${styles.header__text} hide--right ${!isVisible ? '' : 'show'}`}
        >
          With our combined efforts, we are getting closer to bringing peace and
          support to Ukraine. At the same time, we are fighting for peace in the
          modern civilized world.
        </p>

        <HashLink
          to="/#donate"
          className={`${styles.header__button} button--yellow button--secondary`}
        >
          <p>DONATE</p>
        </HashLink>
      </section>
    </header>
  );
};

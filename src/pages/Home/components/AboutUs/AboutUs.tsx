import { useState } from 'react';
import classNames from 'classnames';

import styles from './AboutUs.module.scss';
import { useElementOnScreen } from '../../../../hooks/useElementOnScreen';
import { ReadMore } from '../../../../components/Buttons/ReadMore';

export const AboutUs = () => {
  const { isVisible, container } = useElementOnScreen();
  const [loaded, setIsLoaded] = useState(false);

  return (
    <section ref={container} className={styles.container}>
      <div
        className={classNames(`${styles.img} hide--right`, {
          skeleton: !loaded,
          show: isVisible,
        })}
      >
        <img
          src="./imgs/about-us/about-us1.jpg"
          alt="Civil Defense Ukraine Team"
          className={`${styles.img} `}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      </div>

      <div className={`${styles.text} hide--right ${isVisible ? 'show' : ''}`}>
        <h2 className={`${styles.title} heading--h2`}>About Us</h2>
        <p>
          Civil Defense Ukraine is a charitable organization founded in
          February-March 2022, when the war began. Our mission is to assist
          civilians in Ukraine who took up arms to defend the country. That`s
          why we are called Civil Defense. <br /> We now live in Denmark, but we
          are Ukrainians, dedicating our free time to support the people of our
          native country.
        </p>

        <ReadMore pathname="about-us" />
      </div>
    </section>
  );
};

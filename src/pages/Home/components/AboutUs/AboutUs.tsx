import { useElementOnScreen } from '../../../../hooks/useElementOnScreen';
import styles from './AboutUs.module.scss';
import { ReadMore } from '../../../../components/Buttons/ReadMore';

export const AboutUs = () => {
  const { isVisible, container } = useElementOnScreen();

  console.log('about us', isVisible);

  return (
    <section ref={container} className={styles.container}>
      <picture className={`${styles.img} `}>
        <source
          media="(min-width: 1240px)"
          srcSet="./imgs/about-us/about-us-desktop.png"
        />
        <source
          media="(min-width: 834px)"
          srcSet="./imgs/about-us/about-us-tablet.png"
        />
        <img
          loading="lazy"
          src="./imgs/about-us/about-us.png"
          alt="Civil Defense Ukraine Team"
          className={`${styles.img} hide--left ${isVisible ? 'show' : ''}`}
        />
      </picture>

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

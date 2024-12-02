import { Contacts } from '../../../../components/Contacts/Contacts';
import { useElementOnScreen } from '../../../../hooks/useElementOnScreen';
import styles from './Location.module.scss';

export const Location = () => {
  const { isVisible, container } = useElementOnScreen();

  return (
    <article ref={container} className={styles.location}>
      <div className={styles.location__container}>
        <p className={`${styles.location__header} heading--h2`}>Our Location</p>
        <div
          className={`${styles.location__wrapper} hide--left ${isVisible ? 'show' : ''}`}
        >
          <div>
            <h2 className={`${styles.location__header} heading--h1`}>
              Civil Defense Ukraine
            </h2>
            <Contacts className={styles.info} showCVR={true} />
          </div>
          <a
            className={`${styles.location__img} hide--right ${isVisible ? 'show' : ''}`}
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </div>
    </article>
  );
};

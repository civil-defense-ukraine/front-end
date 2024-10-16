import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.img}></div>
      <div className={styles.info}>
        <h2 className="heading--h1">Somesing went wrong...</h2>
        <p className={styles.text}>
          Sorry, but the page you looking for could not be found.
        </p>
        <Link to="/" className={`${styles.button} button--secondary button--yellow`}>
        HOME
        </Link>
      </div>
    </section>
  );
};

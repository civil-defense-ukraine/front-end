import styles from './LoadingPage.module.scss';
import { Loader } from '../../components/Loader';

export const LoadingPage = () => {
  return (
    <>
      <article className={styles.container}>
        <h2 className="heading--h2">
          This page is currently loading! Please wait!
        </h2>
        <Loader />
      </article>
    </>
  );
};

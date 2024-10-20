import styles from './Error.module.scss';

type Props = {
  errorText?: string;
};

export const Error: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <p className="heading--h3">
        Something went wrong! <br />
      </p>
      <div className={styles.img}></div>
      <p className={styles.text}>
        We're working on fixing this issue. <br /> <br /> In the meantime,
        please check our social media <br /> for the latest news and updates:
      </p>
      <div className={styles.icons}>
        <a
          target="_blank"
          href="https://www.facebook.com/CDUkraine"
          rel="noreferrer"
        >
          <div className="icon icon--medium icon--hover icon--facebook"></div>
        </a>
        <a
          target="_blank"
          href="https://www.instagram.com/civildefense.ukraine/?igsh=MTl4d2trODR5dWNtaA%3D%3D"
          rel="noreferrer"
        >
          <div className="icon icon--medium icon--hover icon--instagram"></div>
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/posts/cdukraine_activity-7212520706830471169-3qV2/"
          rel="noreferrer"
        >
          <div className="icon  icon--medium icon--hover icon--linkedin"></div>
        </a>
      </div>
      <p className={styles.text}>We apologize for any inconvenience.</p>
    </div>
  );
};

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <img
        className={styles.logo}
        loading="lazy"
        src="/imgs/logo.png"
        alt="CDU logo"
      />
      <h2 className="heading--h1">Civil Defence Ukraine</h2>
      <ul className={styles.info}>
        <li className={styles.info__item}>
          <a
            className={styles.info__text}
            target="_blank"
            href="https://maps.app.goo.gl/h8cHAbw1dy66wZv37"
            rel="noreferrer"
          >
            <div
              className={`${styles.info__icon} icon icon--small icon--hover icon--location`}
            ></div>
            <p className={`${styles.info__text} link`}>
              7000 Fredericia, Denmark
            </p>
          </a>
        </li>
        <li className={styles.info__item}>
          <a
            className={styles.info__text}
            target="_blank"
            href="tel:+4540688222"
            rel="noreferrer"
          >
            <div
              className={`${styles.info__icon} icon icon--small  icon--hover icon--phone`}
            ></div>
            <p className={`${styles.info__text} link`}>+45 40 68 82 22</p>
          </a>
        </li>
        <li className={styles.info__item}>
          <a
            className={styles.info__text}
            target="_blank"
            href="mailto:cdefenseukraine@gmail.com"
            rel="noreferrer"
          >
            <div
              className={`${styles.info__icon} icon icon--small icon--hover icon--email`}
            ></div>
            <p className={`${styles.info__text} link`}>
              cdefenseukraine@gmail.com
            </p>
          </a>
        </li>
      </ul>

      <div className={styles.info2}>
        <div>
          <p className="heading--h3">Follow Us</p>
          <div className={styles.icons}>
            <a
              target="_blank"
              href="https://www.facebook.com/CDUkraine"
              rel="noreferrer"
            >
              <div className="icon icon--small icon--hover icon--facebook"></div>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/civildefense.ukraine/?igsh=MTl4d2trODR5dWNtaA%3D%3D"
              rel="noreferrer"
            >
              <div className="icon icon--small icon--hover icon--instagram"></div>
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/posts/cdukraine_activity-7212520706830471169-3qV2/"
              rel="noreferrer"
            >
              <div className="icon icon--small icon--hover icon--linkedin"></div>
            </a>
          </div>
        </div>

        <div className={styles.mobilePay}>
          <div className={styles.mobilePay__icon}></div>
          <p>51718616</p>
        </div>
      </div>

      <div className={styles.line}></div>

      <p className={styles.copyright}>Copyright @ 2024 Civil Defence Ukraine</p>
    </footer>
  );
};

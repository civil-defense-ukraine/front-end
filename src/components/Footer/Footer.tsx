import { Logo } from '../Logo';
import { SocialMedia } from '../SocialMedia';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={`${styles.container} footer`}>
      <Logo classname={'logo logo--big'} />

      <div className={styles.info}>
      <h2 className="heading--h3">Our Contacts</h2>
      <ul className={styles.info__content}>
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

      <div className={styles.icons}>
          <p className="heading--h3">Follow Us</p>
          <SocialMedia/>
        </div>

      </div>
      
      <button className={`button--secondary button--transparent ${styles.button}`}>DONATE</button>

      <div className={styles.bankDetails}>
      <div className={styles.block}>
          <div className={`${styles.icon} ${styles.icon__mobilePay}`}></div>
          <p>51718616</p>
        </div>
      <div className={styles.block}>
        <div className={`${styles.icon} ${styles.icon__danskeBank}`}></div>
        <p>Reg. 5493 <br /> IBAN: DK5054930001652225 <br /> SWIFT: NYKBDKKK</p>
      </div>
    </div>

      <div className={styles.line}></div>

      <p className={styles.copyright}>Copyright @ 2024 Civil Defence Ukraine</p>
    </footer>
  );
};

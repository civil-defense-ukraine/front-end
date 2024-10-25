import { Link, useLocation } from 'react-router-dom';
import { bankDetails, mobilePay } from '../../constants/bankDetails';
import { Logo } from '../Logo';
import { SocialMedia } from '../SocialMedia';
import styles from './Footer.module.scss';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const { pathname } = useLocation();
  const [showDonateButton, setShowDonateButton] = useState(false);
  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      if (scrollPosition > viewportHeight) {
        setShowDonateButton(true);
      } else {
        setShowDonateButton(false);
      }
    }

    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    } else if (pathname.includes('donate')) {
      setShowDonateButton(false);
    } else {
      setShowDonateButton(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

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
          <SocialMedia />
        </div>
      </div>

      {showDonateButton && (
        <Link
          to={'/donate'}
          className={`button--secondary button--transparent ${styles.button}`}
        >
          <p>DONATE</p>
          <div className="icon icon--support icon--medium"></div>
        </Link>
      )}

      <div className={styles.bankDetails}>
        <div className={styles.block}>
          <div className={`${styles.icon} ${styles.icon__mobilePay}`}></div>
          <p>{mobilePay}</p>
        </div>
        <div className={styles.block}>
          <div className={`${styles.icon} ${styles.icon__danskeBank}`}></div>
          <p>
            Reg. {bankDetails['Registration number']}
            <br /> IBAN: {bankDetails.IBAN} <br /> SWIFT: {bankDetails.SWIFT}
          </p>
        </div>
      </div>

      <div className={styles.line}></div>

      <p className={styles.copyright}>Copyright @ 2024 Civil Defence Ukraine</p>
    </footer>
  );
};

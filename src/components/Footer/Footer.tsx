import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Footer.module.scss';

import { bankDetails, mobilePay } from '../../constants/bankDetails';
import { Logo } from '../Logo';
import { SocialMedia } from '../SocialMedia';
import { DonateButton } from '../Buttons/DonateButton';
import { Contacts } from '../Contacts/Contacts';
import { Link } from 'react-router-dom';

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
    <footer className={styles.footer}>
      <section className={styles.container}>
        <Link to="/" onClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }}>
          <Logo classname={'logo logo--big'} />
        </Link>
        <div className={styles.info}>
          <h2 className="heading--h3">Our Contacts</h2>
          <Contacts />
        </div>
        <div className={styles.socialMedia}>
          <p className="heading--h3">Follow Us</p>
          <SocialMedia />
        </div>

        <div className={styles.registration}>

          <a
            target="_blank"
            href="https://www.civilstyrelsen.dk/sagsomraader/indsamlingsnaevnet/godkendte-indsamlinger/2022/komite-ukraine-hjaelp-04827?fbclid=IwY2xjawGV8VRleHRuA2FlbQIxMAABHThFQDXLzMrr7osQ-eMbTLEMqbRNr9zduyTXbymAh83tqii8CzDaaaGbxg_aem_RFZB_sLDOm8NZyM2JRDajQ"
            className={`${styles.info__text} link heading--h3`}
          >
            <div className={`${styles.info__icon} icon icon--small icon--globe`}></div>
            <p>Registration Info</p>
          </a>
        </div>

        {showDonateButton && <DonateButton classname={styles.fixedButton} />}

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

        <p className={styles.copyright}>
          Copyright @ 2024 Civil Defence Ukraine
        </p>
      </section>
    </footer>
  );
};

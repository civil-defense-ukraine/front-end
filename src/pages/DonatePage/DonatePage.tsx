import classNames from 'classnames';
import { Donate } from '../../components/Donate';
import { bankDetails } from '../../constants/bankDetails';
import styles from './DonatePage.module.scss';
import { useEffect, useState } from 'react';

export const DonatePage = () => {
  const [coppiedText, setCoppiedText] = useState('');
  const copyLink = (value: string) => {
    navigator.clipboard.writeText(value);
    setCoppiedText(value);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className={styles.container}>
      <Donate />

      <h2 className={`${styles.header} heading--h1`}>
        Please, support our efforts!
      </h2>

      <div className={styles.details}>
        <h3 className="heading--h2">Bank payment Details</h3>
        <p>Click on the icon to copy</p>
        <div className={styles.details__container}>
          {Object.entries(bankDetails).map(([name, value]) => {
            return (
              <div className={styles.field} key={name}>
                <p>{name}</p>
                <div className={styles.field__value}>
                  <p className={`${styles.field__name} heading--h3`}>{value}</p>
                  <div
                    className={classNames(
                      `copyLink  icon icon--small icon--copy`,
                      {
                        'copyLink--coppied': value === coppiedText,
                        'copyLink--left': name === 'Address',
                      },
                    )}
                    onClick={() => {
                      copyLink(value);
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

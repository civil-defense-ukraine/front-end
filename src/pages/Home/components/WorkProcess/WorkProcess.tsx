import { useEffect, useState } from 'react';
import styles from './WorkProcess.module.scss';
import { useElementOnScreen } from '../../../../hooks/useElementOnScreen';
import classNames from 'classnames';

const process = [
  'Receive a request',
  'Announce a fundraiser',
  'Participate in fundraising activities',
  'Buy the equipment',
  'Deliver equipment to Ukraine',
  'Receive a photo report ',
  'Publish a gratitude report ',
  'Provide documentation to auditors',
];

export const WorkProcess = () => {
  const { container, isVisible } = useElementOnScreen();
  const [showSecondList, setShowSecondList] = useState(false);
  const [firstImageLoaded, setfirstImageLoaded] = useState(false);
  const [secondImageLoaded, setSecondImageLoaded] = useState(false);

  useEffect(() => {
    const img1 = new Image();
    img1.src = require('../../../../imgs/process/event.jfif');
    img1.onload = () => setfirstImageLoaded(true);

    const img2 = new Image();
    img2.src = require('../../../../imgs/process/report.jfif');
    img2.onload = () => setSecondImageLoaded(true);
  }, []);

  useEffect(() => {
    let timer = 0;
    if (isVisible) {
      timer = window.setTimeout(() => {
        setShowSecondList(true);
      }, 1250);
    }
    return () => {
      clearTimeout(timer);
      setShowSecondList(false);
    };
  }, [isVisible]);
  return (
    <section className={styles.wrapper} ref={container}>
      <div className={styles.container}>
        <h2 className={`${styles.header} heading--h2`}>How We Work</h2>
        <div
          className={classNames(`${styles.img} ${styles.img_1}`, {
            ' skeleton': !firstImageLoaded,
            [styles.img_1_loaded]: firstImageLoaded,
          })}
        ></div>
        <ul className={`${styles.items} ${styles.items_1}`}>
          {process.slice(0, 4).map((item, index) => (
            <li
              className={classNames(`${styles.item}`, {
                [styles.item_1]: isVisible,
              })}
              key={item}
            >
              <div className={`${styles.item__index} heading--h2`}>
                {index + 1}
              </div>
              <p className={styles.item__text}>{item}</p>
            </li>
          ))}
        </ul>
        <div
          className={classNames(`${styles.img} ${styles.img_2}`, {
            ' skeleton': !secondImageLoaded,
            [styles.img_2_loaded]: secondImageLoaded,
          })}
        ></div>
        <ul className={`${styles.items} ${styles.items_2}`}>
          {process.slice(4).map((item, index) => (
            <li
              className={classNames(`${styles.item}`, {
                [styles.item_2]: showSecondList,
              })}
              key={item}
            >
              <div className={`${styles.item__index} heading--h2`}>
                {index + 5}
              </div>
              <p className={styles.item__text}>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

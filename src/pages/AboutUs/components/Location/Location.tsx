import styles from './Location.module.scss';

export const Location = () => {
  return <article className={styles.location}>
    <div className={styles.location__container}>

      <p className={`${styles.location__header} heading--h2`}>Our Location</p>
      <div className={styles.location__wrapper}>
        <div>
          <h2 className={`${styles.location__header} heading--h1`}>Civil Defence Ukraine</h2>
          <ul className={styles.info}>
            <li className={styles.info__item}>
              <a className={styles.info__text} target='_blank' href="https://maps.app.goo.gl/Yx1c4ASpNPkiCEB67" rel="noreferrer">
                <div className={`${styles.info__icon} icon icon--small icon--hover icon--location`}></div>
                <p className={`${styles.info__text} link`}>
                  Munkemolestrade 20, 5000,<br /> Odense, Denmark
                </p>
              </a>
            </li>
            <li className={styles.info__item}>
              <a className={styles.info__text} target='_blank' href="tel:+4540688222" rel="noreferrer">
                <div className={`${styles.info__icon} icon icon--small  icon--hover icon--phone`}></div>
                <p className={`${styles.info__text} link`}>+45 40 68 82 22</p>
              </a>
            </li>
            <li className={styles.info__item}>
              <a className={styles.info__text} target='_blank' href="mailto:cdefenseukraine@gmail.com" rel="noreferrer">
                <div className={`${styles.info__icon} icon icon--small icon--hover icon--email`}></div>
                <p className={`${styles.info__text} link`}>cdefenseukraine@gmail.com</p>
              </a>
            </li>
            <li>CVR No: 12352351</li>
          </ul>
        </div>
        <a className={styles.location__img} href="http://" target="_blank" rel="noopener noreferrer">
        </a>
      </div>
    </div>
  </article>

}
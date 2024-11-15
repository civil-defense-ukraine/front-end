import { contacts } from '../../constants/contacts';
import styles from './Contacts.module.scss';

type Props = {
  className?: string,
  showCVR?: boolean
}

export const Contacts: React.FC<Props> = ({ className = '', showCVR = false }) => {

  const { address, phoneNumber, email, CVRnumber } = contacts;
  return (
    <ul className={`${styles.info} ${className}`}>
      <li>
        <a
          className={`${styles.info__text} link`}
          target="_blank"
          href={address.link}
          rel="noreferrer"
        >
          <div
            className={`${styles.info__icon} icon icon--small icon--location`}
          ></div>
          <p>
            {address.text}
          </p>
        </a>
      </li>
      <li>
        <a
          className={`${styles.info__text} link`}
          target="_blank"
          href={phoneNumber.link}
          rel="noreferrer"
        >
          <div
            className={`${styles.info__icon} icon icon--small icon--phone`}
          ></div>
          <p>{phoneNumber.text}</p>
        </a>
      </li>
      <li>
        <a
          className={`${styles.info__text} link`}
          target="_blank"
          href={email.link}
          rel="noreferrer"
        >
          <div
            className={`${styles.info__icon} icon icon--small icon--email`}
          ></div>
          <p>
            {email.text}
          </p>
        </a>
      </li>
      {showCVR && <li className={styles.info__text}>{CVRnumber.text}</li>}
    </ul>
  )
}
import { title } from 'process';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  const sidebarItems = {
    Home: ['ActiveDonation'],
    'About Us': ['Team'],
    News: ['Announcements', 'News', 'Events', 'All'],
  };
  return (
    <>
      <div className={styles.logo}></div>
      {Object.entries(sidebarItems).map(([pageTitle, pageText]) => {
        return (
          <div className={styles.item} key={title}>
            <p className={styles.item__title}>{pageTitle}</p>
            <div className={styles.item__text}>
              {pageText.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

import { title } from 'process';
import styles from './Sidebar.module.scss';
import { Logo } from '../../../components/Logo';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(`link`, {
    'link--active': isActive,
  });

export const Sidebar = () => {
  const sidebarItems = {
    Home: ['Active Donation'],
    'About Us': ['Team'],
    News: ['Reports', 'News', 'Events', 'All'],
  };
  return (
    <>
      <div className={styles.logo}>
        <Logo />
      </div>
      {Object.entries(sidebarItems).map(([pageTitle, pageText]) => {
        return (
          <div className={styles.item} key={title}>
            <p className={styles.item__title}>{pageTitle}</p>
            <div className={styles.item__text}>
              {pageText.map((text, index) => {
                const link = text.toLowerCase().replaceAll(' ', '-');
                return (
                  <NavLink to={link} className={getLinkClass}>
                    <p key={index}>{text}</p>
                  </NavLink>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

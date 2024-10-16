import { NavLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import styles from './TopBar.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import { useWidth } from '../../hooks/useWidth';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(`${styles.nav__link}  link`, {
    'link--active': isActive,
  });

export const TopBar = () => {
  const { showMenu, setShowMenu } = useContext(MenuContext);
  const { pathname, state } = useLocation();

  console.log(state, pathname);

  const width = useWidth();
  const getBarClass = (order: number) =>
    classNames(`${styles.bar} ${styles[`bar__${order}`]}`, {
      [styles[`bar__${order}__selected`]]: showMenu,
    });

  return (
    <div
      className={classNames(`${styles.topBar} header`, {
        [styles.topBar__menu]: showMenu,
      })}
    >
      <Link to="/">
        {!showMenu ? (
          <Logo />
        ) : (
          <img
            className="logo"
            src={require('../../imgs/logo-blue.png')}
            alt="CDU logo"
          />
        )}
      </Link>
      <ul className={`${styles.topBar__nav} ${styles.nav}`}>
        <li className={styles.nav__item}>
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink to="about-us" className={getLinkClass}>
            About Us
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink to="news" className={getLinkClass}>
            News
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink to="reports" className={getLinkClass}>
            Reports
          </NavLink>
        </li>
      </ul>
      <HashLink
        className={classNames(`${styles.topBar__button}`, {
          [styles.topBar__button__menu]: showMenu,
        })}
        onClick={() => setShowMenu(false)}
        to="/#contact-form"
      >
        CONTACT US{' '}
      </HashLink>

      {width < 834 && (
        <div
          className={styles.icon1}
          onClick={() => setShowMenu(prev => !prev)}
        >
          <div
            className={classNames(`${styles.hamburger}`, {
              [styles.hamburger__selected]: showMenu,
            })}
          >
            {Array.from(Array(4).keys()).map((__el, index) => (
              <span key={index} className={getBarClass(index)}></span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

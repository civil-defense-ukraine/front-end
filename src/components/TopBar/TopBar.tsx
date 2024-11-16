import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import styles from './TopBar.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import React, { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import { useWidth } from '../../hooks/useWidth';
import { screenWidth } from '../../constants/screenWidth';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(`${styles.nav__link}  link`, {
    'link--active': isActive,
  });

export const TopBar = React.memo(() => {
  const { showMenu, setShowMenu } = useContext(MenuContext);
  const width = useWidth();
  const getBarClass = (order: number) =>
    classNames(`${styles.bar} ${styles[`bar__${order}`]}`, {
      [styles[`bar__${order}__selected`]]: showMenu,
    });
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={classNames(`${styles.topBar}`, {
        [styles.topBar__menu]: showMenu,
      })}
    >
      <div className={styles.topBar__content}>
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
            <NavLink to="/" className={getLinkClass} onClick={handleLinkClick}>
              Home
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink to="about-us" className={getLinkClass} onClick={handleLinkClick}>
              About Us
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink to="news" className={getLinkClass} onClick={handleLinkClick}>
              News
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink to="reports" className={getLinkClass} onClick={handleLinkClick}>
              Reports
            </NavLink>
          </li>
        </ul>
        <HashLink
          className={classNames(
            `button button--transparent ${styles.topBar__button}`,
            {
              [styles.topBar__button__menu]: showMenu,
            },
          )}
          onClick={() => setShowMenu(false)}
          to="/#contact-form"
        >
          <p>CONTACT US</p>
          <div className="icon icon--button icon--send icon--send--yellow"></div>
        </HashLink>

        {width < screenWidth.tablet && (
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
    </div>
  );
});

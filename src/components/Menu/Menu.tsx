import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './Menu.module.scss';
import classNames from 'classnames';
import { HashLink } from 'react-router-hash-link';
import { SocialMedia } from '../SocialMedia';
import { useContext, useEffect } from 'react';
import { useWidth } from '../../hooks/useWidth';
import { MenuContext } from '../../context/MenuContext';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(`${styles.nav__link}  link link--menu`, {
    'link--menu--active': isActive,
  });

export const Menu = () => {
  const width = useWidth();
  const { setShowMenu } = useContext(MenuContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('no-scroll');
    if (width >= 834) {
      document.body.classList.remove('no-scroll');
      setShowMenu(false);
      navigate('/');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [width]);

  const linkClick = () => setShowMenu(false);

  return (
    <section id="menu" className={`${styles.container}`}>
      <ul className={`${styles.nav}`}>
        <li className={styles.nav__item}>
          <NavLink to="/" className={getLinkClass} onClick={linkClick}>
            Home
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink to="about-us" className={getLinkClass} onClick={linkClick}>
            About Us
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink to="news" className={getLinkClass} onClick={linkClick}>
            News
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink to="reports" className={getLinkClass} onClick={linkClick}>
            Reports
          </NavLink>
        </li>
      </ul>

      <SocialMedia classname="blue" />
    </section>
  );
};

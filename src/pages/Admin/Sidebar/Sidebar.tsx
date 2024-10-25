import { title } from 'process';
import styles from './Sidebar.module.scss';
import { Logo } from '../../../components/Logo';

import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Link } from 'react-router-dom';



const sidebarItems = {
  Home: ['Active Donation'],
  'About Us': ['Team'],
  News: ['Reports', 'News', 'Events', 'All'],
};

export const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const getLinkClass = (isNewsCategory: boolean, link: string) => {
    const type = searchParams.get('type');
    const isActive = isNewsCategory
      ? (link === 'all' && type === null) || link === type
      : pathname.slice(7) === link;

    return classNames(`link ${styles.link}`, {
      'link--active': isActive,
    });
  };

  return (
    <>
      <div className={styles.logo}>
        <Link to={'/'}>
          <Logo />
        </Link>
      </div>
      {Object.entries(sidebarItems).map(([pageTitle, pageText]) => {
        return (
          <div className={styles.item} key={title}>
            <p className={styles.item__title}>{pageTitle}</p>
            <div className={styles.item__links}>
              {pageText.map((text, index) => {
                const link = text.toLowerCase().replaceAll(' ', '-');
                const isNewsCategory = sidebarItems.News.includes(text);
                const updatedSearchParams = new URLSearchParams(searchParams);
                if (text === 'All') {
                  updatedSearchParams.delete('type');
                } else {
                  const normalized = text.toLowerCase();
                  updatedSearchParams.set('type', normalized);
                }

                return (
                  <Link
                    to={isNewsCategory ? `/admin/?${updatedSearchParams.toString()}` : link}
                    className={getLinkClass(isNewsCategory, link)}
                    key={pageText[index]}
                  >
                    <p>{text}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

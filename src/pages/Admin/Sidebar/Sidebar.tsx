import styles from './Sidebar.module.scss';
import { Logo } from '../../../components/Logo';
import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const sidebarItems = {
  Home: ['Active Donation'],
  'About Us': ['Team'],
  News: ['Reports', 'News', 'Events', 'All'],
};

const updateSearchParams = (link: string, searchParams: URLSearchParams) => {
  const updatedSearchParams = new URLSearchParams(searchParams);
  if (link === 'All') {
    updatedSearchParams.delete('type');
  } else {
    const normalized = link.toLowerCase();
    updatedSearchParams.set('type', normalized);
  }

  return updatedSearchParams.toString();
};

export const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const getLinkClass = (isNewsCategory: boolean, link: string) => {
    const type = searchParams.get('type');
    const isActive = isNewsCategory
      ? (link === 'all' && type === null && pathname.slice(7) === '') ||
        link === type
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
      <nav>
        {Object.entries(sidebarItems).map(([pageTitle, pageText]) => {
          return (
            <div className={styles.item} key={pageTitle}>
              <p className={styles.item__title}>{pageTitle}</p>
              <div className={styles.item__links}>
                {pageText.map((text, index) => {
                  const link = text.toLowerCase().replaceAll(' ', '-');
                  const isNewsCategory = sidebarItems.News.includes(text);
                  const updatedSearchParams = updateSearchParams(
                    text,
                    searchParams,
                  );

                  return (
                    <NavLink
                      to={
                        isNewsCategory
                          ? `/admin/?${updatedSearchParams}`
                          : `/admin/${link}`
                      }
                      className={getLinkClass(isNewsCategory, link)}
                      key={`${pageText[index]}/${index}`}
                    >
                      <p>{text}</p>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </>
  );
};

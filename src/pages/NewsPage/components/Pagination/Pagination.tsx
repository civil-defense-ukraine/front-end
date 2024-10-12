import { useSearchParams } from 'react-router-dom';
import { News } from '../../../../types/News';
import styles from './Pagination.module.scss';
import { useMemo } from 'react';
import classNames from 'classnames';
import { useWidth } from '../../../../hooks/useWidth';
import { getPagination } from '../../../../utils/getPageSearchParams';

export const Pagination = ({ news }: { news: News[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);
  const numberOfPages = Math.ceil(news.length / 10);

  const width = useWidth();

  const handleClick = (value: string | number) => {
    const newSearchParams = getPagination.searchParams(value, currentPage);
    window.scrollTo({
      top: 1200,
      left: 0,
      behavior: 'auto',
    });

    setSearchParams(newSearchParams);
  };

  const pages = useMemo(() => {
    if (width > 625) {
      return getPagination.bigScreen(numberOfPages, currentPage);
    }
    return getPagination.smallScreen(numberOfPages, currentPage);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <div
        className={classNames(`${styles.arrowButton}`, {
          [styles.arrowButton__disabled]: currentPage <= 1,
        })}
        onClick={() => {
          handleClick(currentPage - 1 >= 1 ? currentPage - 1 : 1);
        }}
      >
        <div
          className={classNames(
            `${styles.arrowButton__icon} icon icon--little icon--arrow`,
            {
              [styles.arrowButton__icon__disabled]: currentPage <= 1,
            },
          )}
        ></div>
        {width > 540 && <p>Previous</p>}
      </div>
      <div className={styles.buttons}>
        {pages.map(page => {
          return (
            <div
              key={page}
              className={classNames(`${styles.button}`, {
                [styles.button__selected]:
                  page === currentPage || (page === 1 && currentPage === 0),
              })}
              onClick={() => {
                handleClick(page);
              }}
            >
              {page}
            </div>
          );
        })}
      </div>
      <div
        className={classNames(`${styles.arrowButton}`, {
          [styles.arrowButton__disabled]: currentPage >= numberOfPages,
        })}
        onClick={() => {
          handleClick(
            currentPage + 1 >= numberOfPages ? numberOfPages : currentPage + 1,
          );
        }}
      >
        {width > 540 && <p>Next</p>}
        <div
          className={classNames(
            `${styles.arrowButton__icon} icon icon--little icon--arrow`,
            {
              [styles.arrowButton__icon__disabled]:
                currentPage >= numberOfPages,
            },
          )}
        ></div>
      </div>
    </div>
  );
};

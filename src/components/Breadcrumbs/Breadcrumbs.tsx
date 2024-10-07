import { useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import React from 'react';
import { path } from '../../utils/path';
import { Link } from 'react-router-dom';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles.container}>
      <Link to="/" className={`link`}>
        Home
      </Link>
      {pathname
        .slice(1)
        .split('/')
        .map((curPath, index, all) => {
          const nornalizedPath = path.getNormalizedName(curPath);
          const currentPath = path.getCurrent(pathname, index);
          const lastIndex = index === all.length - 1;

          return (
            <React.Fragment key={curPath}>
              <div className={`${styles.arrow} icon icon--arrow`}></div>
              {lastIndex ? (
                <p className={styles.text_disabled}>{nornalizedPath}</p>
              ) : (
                <Link to={currentPath} className={`link`}>
                  {nornalizedPath}
                </Link>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};

import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from './Main.module.scss';
import { loadNews } from '../../../features/newsSlice';
import { getNormalized } from '../../../utils/getNormalized';
import { AdminContext } from '../../../context/AdminContext';
import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ItemsCatalog } from './components/ItemsCatalog';
import { getFilteredNews } from '../../../utils/getFilteredNews';
// const newsCategories = ['Reports', 'News', 'Events', 'All'];

export const Main = () => {
  const columns = ['Title', 'Date', 'Image', 'Text'];
  const dispatch = useAppDispatch();
  const { news } = useAppSelector(state => state.news);
  const { setSelectedItem, setDisplayForm } = useContext(AdminContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(loadNews());
    setSelectedItem(null);
    // setServiceFunctions({
    //   post: () => {},
    //   delete:() => {},
    //   update: () => {},
    // })
  }, []);

  const getDisplayedNews = useCallback(() => {
    const query = searchParams.get('query') || '';
    const category = searchParams.get('type') || 'all';

    return getFilteredNews({ news, category, query });
  }, [news, searchParams]);
  
  // const getDisplayedTeam = useCallback(() => {
  //   const query = searchParams.get('query') || '';

  //   return getFilteredNews({ news, category, query });
  // }, [news, searchParams]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <label className={styles.header__search}>
          <div
            className={`${styles.header__search__icon} icon icon--small icon--search`}
          ></div>
          <input
            className={`${styles.header__search__field} formField`}
            type="text"
            name=""
            id=""
            placeholder="Search..."
          />
        </label>

        <button
          className={`${styles.searchButton} button--yellow button--secondary`}
          onClick={() => setDisplayForm(true)}
        >
          NEW ITEM
        </button>
      </div>
      <ItemsCatalog columns={columns} items={getDisplayedNews()} />
    </section>
  );
};

import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { debounce } from 'lodash';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import styles from './Main.module.scss';
import { FormContext } from '../../../context/FormContext';
import { useAppDispatch } from '../../../app/hooks';
import { loadNews } from '../../../features/newsSlice';
import { loadTeam } from '../../../features/teamSlice';

export const Main = () => {
  const { setDisplayForm, setSelectedItem } = useContext(FormContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadNews());
    dispatch(loadTeam());
  }, []);

  const { pathname } = useLocation();
  console.log(pathname);

  const setApplyQuery = (newQuery: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const normalizedQuery = newQuery.toString();
    if (normalizedQuery.length === 0) {
      newSearchParams.delete('query');
    } else {
      newSearchParams.set('query', normalizedQuery);
    }

    setSearchParams(newSearchParams.toString());
  };

  const applyQuery = useCallback(debounce(setApplyQuery, 1000), []);
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

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
            value={query}
            onChange={handleQueryChange}
          />
        </label>

        <button
          className={`${styles.searchButton} button--yellow button--secondary`}
          onClick={() => {
            setDisplayForm(true);
            setSelectedItem(null);
            
          }}
        >
          NEW ITEM
        </button>
      </div>
      <Outlet />
    </section>
  );
};

import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';
import { FormContext } from '../../../../context/FormContext';

export const AdminSearch = () => {
  const { setDisplayForm, setSelectedItem } = useContext(FormContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

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
    <section className={styles.header}>
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
        className={`${styles.searchButton} button button--yellow button--secondary`}
        onClick={() => {
          setDisplayForm(true);
          setSelectedItem(null);
        }}
      >
        <p>NEW ITEM</p>
        <div className="icon icon--plus icon--medium"></div>
      </button>
    </section>
  );
};

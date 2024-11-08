import React from 'react';
import styles from './Inputs.module.scss';

type Props = {
  dateValue: string;
  updateDate: (newValue: string) => void;
};

export const DateInput: React.FC<Props> = React.memo(
  ({ dateValue, updateDate }) => {
    return (
      <label htmlFor="date" className={`${styles.label} ${styles.label__date}`}>
        Date
        <br />
        <input
          className="formField"
          value={dateValue}
          readOnly
          type="text"
          id="date"
          placeholder="dd/mm/yyyy"
        />
        <input
          type="date"
          className={styles.date}
          onChange={e => updateDate(e.target.value)}
          id="date"
        />
      </label>
    );
  },
);

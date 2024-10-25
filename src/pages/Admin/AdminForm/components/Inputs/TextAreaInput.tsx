import classNames from 'classnames';

import styles from './Inputs.module.scss';
import React from 'react';

type Props = {
  fieldValue: string;
  placeHolder: string;
  fieldError: string;
  updateInput: (newValue: string) => void;
  basicHeight?: boolean;
};

export const TextAreaInput: React.FC<Props> = React.memo(
  ({
    fieldValue,
    fieldError,
    placeHolder,
    updateInput,
    basicHeight = false,
  }) => {
    return (
      <label htmlFor="messageText" className={styles.label}>
        Text
        <br />
        <textarea
          className={classNames(`form__textArea formField`, {
            formField__notValid: fieldError,
            form__textArea__small: basicHeight,
          })}
          placeholder={placeHolder}
          value={fieldValue}
          onChange={e => {
            updateInput(e.target.value);
          }}
        ></textarea>
        {fieldError && (
          <p className="formField__notValid--text">{fieldError}</p>
        )}
      </label>
    );
  },
);

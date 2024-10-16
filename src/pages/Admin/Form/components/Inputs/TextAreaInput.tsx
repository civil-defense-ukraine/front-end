import classNames from 'classnames';

import styles from './Inputs.module.scss';

type Props = {
  fieldValue: string;
  placeHolder: string;
  fieldError: string;
  updateInput: (fieldName: string, newValue: string) => void;
};

export const TextAreaInput: React.FC<Props> = ({
  fieldValue,
  fieldError,
  placeHolder,
  updateInput,
}) => {
  return (
    <label htmlFor="messageText" className={styles.label}>
      Text
      <br />
      <textarea
        className={classNames(`form__textArea formField`, {
          formField__notValid: fieldError,
        })}
        placeholder={placeHolder}
        value={fieldValue}
        onChange={e => {
          updateInput('text', e.target.value);
        }}
      ></textarea>
      {fieldError && <p className="formField__notValid--text">{fieldError}</p>}
    </label>
  );
};

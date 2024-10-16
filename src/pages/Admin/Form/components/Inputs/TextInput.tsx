import classNames from 'classnames';
import styles from './Inputs.module.scss';

type Props = {
  fieldTitle: string;
  fieldValue: string;
  placeHolder: string;
  fieldError: string;
  updateInput: (fieldName: string, newValue: string) => void;
};

export const TextInput: React.FC<Props> = ({
  fieldTitle,
  fieldValue,
  fieldError,
  placeHolder,
  updateInput,
}) => {
  return (
    <label htmlFor={fieldTitle} className={styles.label}>
      {fieldTitle}
      <br />
      <input
        className={classNames(`formField`, {
          formField__notValid: fieldError,
        })}
        value={fieldValue}
        onChange={e => {
          updateInput('title', e.target.value);
        }}
        id={fieldTitle}
        type="text"
        placeholder={placeHolder}
      />
      {fieldError && <p className="formField__notValid--text">{fieldError}</p>}
    </label>
  );
};

import { useContext, useState } from 'react';
import styles from './Form.module.scss';
import { getNormalized } from '../../../utils/getNormalized';
import { TextInput } from './components/Inputs/TextInput';
import { DateInput } from './components/Inputs/DateInput';
import { TextAreaInput } from './components/Inputs/TextAreaInput';
import { ImageInput } from './components/Inputs/ImageInput';
import classNames from 'classnames';
import { AdminContext } from '../../../context/AdminContext';

type initialFormState = {
  title: string;
  date: string;
  image: null | File;
  imageTitle: string;
  text: string;
};

export const Form = () => {
  const { displayForm, setDisplayForm } = useContext(AdminContext);
  const [errors, setErrors] = useState({ title: '', text: '' });
  const [formField, setFormField] = useState<initialFormState>({
    title: '',
    date: getNormalized.dateForAdmin(new Date()),
    image: null,
    imageTitle: '',
    text: '',
  });
  const updateInput = (fieldTitle: string, newValue: string | File | null) => {
    setFormField(prevValue => ({ ...prevValue, [fieldTitle]: newValue }));
  };

  const updateDate = (date: string) => {
    const normalized = getNormalized.dateForAdmin(new Date(date));
    updateInput('date', normalized);
  };

  return (
    <section
      className={classNames(styles.container, {
        [styles.container__show]: displayForm,
      })}
    >
      <div
        className={`${styles.backButton} button--transparent`}
        onClick={() => setDisplayForm(false)}
      >
        <div
          className={`${styles.backButton__icon} icon icon--arrow icon--small`}
        ></div>
        <p>Back</p>
      </div>
      <form
        className={`${styles.form} form`}
        autoComplete="off"
        noValidate
        onSubmit={e => {
          e.preventDefault();
          console.log('works');
        }}
      >
        <TextInput
          fieldTitle="Title"
          fieldValue={formField.title}
          fieldError={errors.title}
          placeHolder="Please enter title"
          updateInput={updateInput}
        />
        <DateInput dateValue={formField.date} updateDate={updateDate} />
        <ImageInput updateInput={updateInput} />
        <TextAreaInput
          fieldValue={formField.text}
          fieldError={errors.text}
          placeHolder={'Type the text of the news article...'}
          updateInput={updateInput}
        />

        <div className={styles.buttons}>
          <button
            type="submit"
            className={`form__button button--yellow button--secondary`}
          >
            SAVE
          </button>
          <button
            className={`form__button button--transparent button--secondary`}
          >
            RESET
          </button>
        </div>
      </form>
    </section>
  );
};

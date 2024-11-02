import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import styles from '../AdminForm/Form.module.scss';
import { getNormalized } from '../../../utils/getNormalized';
import { TextInput } from '../AdminForm/components/Inputs/TextInput';
import { DateInput } from '../AdminForm/components/Inputs/DateInput';
import { TextAreaInput } from '../AdminForm/components/Inputs/TextAreaInput';
import { ImageInput } from '../AdminForm/components/Inputs/ImageInput';
import classNames from 'classnames';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { FormContext } from '../../../context/FormContext';
import { newsSlice } from '../../../features/newsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { adminNews } from '../../../services/admin/adminNews';
import { Loader } from '../../../components/Loader';
import { checkAdminFormField } from '../../../utils/checkFormFields';

type initialFormState = {
  title: string;
  publicationDate: Date;
  image: null | File | string;
  text: string;
  type: string;
};

type ValidationErrors<T> = {
  [K in keyof T]?: string | null;
};

export const NewsForm = () => {
  const { displayForm, setDisplayForm, selectedItem } = useContext(FormContext);
  const [errors, setErrors] = useState<ValidationErrors<initialFormState>>();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const dispatch = useAppDispatch();

  const defaultValue = useMemo(() => {
    return {
      title: selectedItem && 'title' in selectedItem ? selectedItem.title : '',
      publicationDate:
        selectedItem && 'publicationDate' in selectedItem
          ? new Date(selectedItem.publicationDate)
          : new Date(),
      image:
        selectedItem && 'image' in selectedItem ? selectedItem.image : null,
      text: selectedItem && 'title' in selectedItem ? selectedItem.text : '',
      type: selectedItem && 'type' in selectedItem ? selectedItem.type : 'news',
    };
  }, [selectedItem]);

  const [formField, setFormField] = useState<initialFormState>(defaultValue);
  const updateInput = (fieldTitle: string) => {
    return (newValue: string | File | null | Date) => {
      setFormField(prevValue => ({ ...prevValue, [fieldTitle]: newValue }));
    };
  };

  useEffect(() => {
    setFormField(defaultValue);
  }, [selectedItem]);

  const [token] = useSessionStorage('token', '');

  const updateDate = (date: string) => {
    updateInput('publicationDate')(new Date(date));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors(checkAdminFormField(formField));

    // if (checkAdminFormField(formField)) {
    //   return;
    // }

    const formData = new FormData();
    const restdata = {
      title: formField.title,
      text: formField.text,
      type: formField.type,
      publicationDate: formField.publicationDate.toISOString(),
    };

    formData.append(
      'requestDto',
      new Blob([JSON.stringify(restdata)], { type: 'application/json' }),
    );

    if (formField.image) {
      formData.append('image', formField.image);
    }

    if (selectedItem) {
      adminNews
        .update(selectedItem.id, formData, token)
        .then(newArticle => {
          dispatch(
            newsSlice.actions.update({
              ...newArticle,
              link: getNormalized.link(formField.title),
            }),
          );

          clearForm();
        })
        .catch(err => {
          console.error(err);
          console.log(formField);
          setFormError('Something went wrong! Try again later!');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log(formData);

      adminNews
        .post(formData, token)
        .then(newArticle => {
          dispatch(
            newsSlice.actions.add({
              ...newArticle,
              link: getNormalized.link(formField.title),
            }),
          );
          clearForm();
        })
        .catch(err => {
          console.log(err);
          setFormError('Something went wrong! Try again later!');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  function clearForm() {
    setFormField({
      title: '',
      publicationDate: new Date(),
      image: null,
      text: '',
      type: 'news',
    });
  }

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
        onSubmit={handleSubmit}
      >
        <TextInput
          fieldTitle="Title"
          fieldValue={formField.title}
          fieldError={errors?.title || ''}
          placeHolder="Please enter title"
          updateInput={updateInput('title')}
        />

        <DateInput
          dateValue={getNormalized.dateForAdmin(formField.publicationDate)}
          updateDate={updateDate}
        />

        <label htmlFor="" className={styles.label}>
          Choose a type:
        </label>
        <div className={styles.types}>
          {['EVENT', 'NEWS', 'REPORT'].map(type => {
            return (
              <div
                className={classNames(styles.type, {
                  [styles.type__selected]:
                    formField.type.toUpperCase() === type.toUpperCase(),
                })}
                onClick={() => updateInput('type')(type.toUpperCase())}
              >
                {type}
              </div>
            );
          })}
        </div>

        <ImageInput
          defaultImage={formField.image}
          updateInput={updateInput('image')}
        />
        <TextAreaInput
          fieldValue={formField.text}
          fieldError={errors?.text || ''}
          placeHolder={'Type the text of the news article...'}
          updateInput={updateInput('text')}
        />
        {formError && <p className="formField__notValid--text">{formError}</p>}
        {loading ? (
          <Loader />
        ) : (
          <div className={styles.buttons}>
            <button
              type="submit"
              className={`form__button button--yellow button--secondary`}
            >
              SAVE
            </button>

            <button
              className={`form__button button--transparent button--secondary`}
              onClick={() => clearForm()}
            >
              RESET
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import styles from '../../components/FormComponents/Form.module.scss';
import { getNormalized } from '../../../../utils/getNormalized';
import classNames from 'classnames';
import { useSessionStorage } from '../../../../hooks/useSessionStorage';
import { FormContext } from '../../../../context/FormContext';
import { newsSlice } from '../../../../features/newsSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { adminNews } from '../../../../services/admin/adminNews';
import { Loader } from '../../../../components/Loader';
import { checkAdminFormField } from '../../../../utils/checkFormFields';
import { TextInput } from '../../components/FormComponents/components/TextInput';
import { DateInput } from '../../components/FormComponents/components/DateInput';
import { ImageInput } from '../../components/FormComponents/components/ImageInput';
import { TextAreaInput } from '../../components/FormComponents/components/TextAreaInput';
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { News } from '../../../../types/News';

type initialFormState = {
  title: string;
  publicationDate: Date;
  image: null | File | string;
  text: string;
  type: string;
};

const defaultErrors = {
  title: '',
  image: '',
  text: '',
};

const defaultNews = {
  title: '',
  publicationDate: new Date(),
  image: null,
  text: '',
  type: 'news',
};

export const NewsForm = () => {
  const { displayForm, setDisplayForm, selectedItem } = useContext(FormContext);
  const [errors, setErrors] = useState<{ [key: string]: string }>(
    defaultErrors,
  );
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { setAuthorized } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      setErrors(defaultErrors);
      setFormError('');
    };
  };

  useEffect(() => {
    setFormField(defaultValue);
  }, [selectedItem]);

  const [token] = useSessionStorage('token', '');

  const updateDate = (date: string) => {
    updateInput('publicationDate')(new Date(date));
  };

  const handleFormError = (err: any) => {
    if (err.message && err.message.includes('401')) {
      setAuthorized(false);
      navigate('/login');
    }
    setFormError('Something went wrong! Try again later!');
  };

  const updateData = (updatedArticle: News) => {
    dispatch(newsSlice.actions.update(updatedArticle));
    clearForm();
  };

  const addData = (newArticle: News) => {
    dispatch(newsSlice.actions.add(newArticle));
    clearForm();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors(checkAdminFormField(formField));

    const hasErrors = Object.values(checkAdminFormField(formField)).filter(
      error => error.length > 0,
    );
    if (hasErrors.length > 0) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    const restdata = {
      title: formField.title,
      text: formField.text,
      type: formField.type,
      publicationDate: formField.publicationDate.toISOString(),
      link: getNormalized.link(formField.title),
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
        .then(updateData)
        .catch(handleFormError)
        .finally(() => {
          setLoading(false);
        });
    } else {
      adminNews
        .post(formData, token)
        .then(addData)
        .catch(handleFormError)
        .finally(() => {
          setLoading(false);
        });
    }
  };

  function clearForm() {
    setFormField(defaultNews);
    setErrors(defaultErrors);
    setFormError('');
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
          fieldError={errors.title}
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
          fieldError={errors.image}
        />
        <TextAreaInput
          fieldValue={formField.text}
          fieldError={errors.text}
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
              className={`form__button button button--yellow button--secondary`}
            >
              SAVE
            </button>

            <button
              className={`form__button button button--transparent button--secondary`}
              onClick={e => {
                e.preventDefault();
                clearForm();
              }}
            >
              RESET
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

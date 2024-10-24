import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import styles from './Form.module.scss';
import { getNormalized } from '../../../utils/getNormalized';
import { TextInput } from './components/Inputs/TextInput';
import { DateInput } from './components/Inputs/DateInput';
import { TextAreaInput } from './components/Inputs/TextAreaInput';
import { ImageInput } from './components/Inputs/ImageInput';
import classNames from 'classnames';
import { AdminContext } from '../../../context/AdminContext';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { FormContext } from '../../../context/FormContext';
import { adminTeam } from '../../../services/admin/adminTeam';

type initialFormState = {
  name: string;
  image: null | File;
  position: string;
  description: string;
};

export const TeamForm = () => {
  const { displayForm, setDisplayForm, selectedItem } = useContext(FormContext);
  const [errors, setErrors] = useState({ title: '', position: '', description: '' });

  const defaultValue = useMemo(() => {
    return {
      name: selectedItem && 'name' in selectedItem ? selectedItem.name : '',
      image: null,
      description: selectedItem && 'description' in selectedItem ? selectedItem.description : '',
      position: selectedItem && 'position' in selectedItem ? selectedItem.position : '',
    } as initialFormState;
  }, [selectedItem]);

  const [formField, setFormField] = useState<initialFormState>(defaultValue);
  const updateInput = (fieldTitle: string) => {
    return (newValue: string | File | null) => {
      setFormField(prevValue => ({ ...prevValue, [fieldTitle]: newValue }));
    }
  };

  useEffect(() => {
    setFormField(defaultValue);
  }, [selectedItem]);

  const [token] = useSessionStorage('token', '');


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    const restdata = {
      name: formField.name,
      position: formField.position,
      description: formField.description,
    };

    formData.append(
      'requestDto',
      new Blob([JSON.stringify(restdata)], { type: 'application/json' }),
    );

    if (formField.image) {
      formData.append('image', formField.image);
    }


    if (selectedItem) {
      adminTeam
        .update(selectedItem.id, formData, token)
        .then(() => {
          clearForm();
        })
        .catch(err => console.error(err));
    } else {
      adminTeam
        .post(formData, token)
        // .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }
  }

  function clearForm() {
    setFormField({
      name: '',
      image: null,
      description: '',
      position: '',
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
          fieldTitle="Name"
          fieldValue={formField.name}
          fieldError={errors.title}
          placeHolder="Please enter full name"
          updateInput={updateInput('name')}
        />
        <ImageInput updateInput={updateInput('image')} />
        <TextInput
          fieldTitle="Role"
          fieldValue={formField.position}
          fieldError={errors.position}
          placeHolder="Please enter role"
          updateInput={updateInput('position')}
        />
        <TextAreaInput
          fieldValue={formField.description}
          fieldError={errors.description}
          placeHolder={'Type the favourite quote...'}
          updateInput={updateInput('description')}
          basicHeight={true}
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
            onClick={() => clearForm()}
          >
            RESET
          </button>
        </div>
      </form>
    </section>
  );
};

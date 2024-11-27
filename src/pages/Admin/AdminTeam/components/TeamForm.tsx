/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';

import styles from '../../components/FormComponents/Form.module.scss';
import { FormContext } from '../../../../context/FormContext';
import { useSessionStorage } from '../../../../hooks/useSessionStorage';
import { useAppDispatch } from '../../../../app/hooks';
import { checkAdminFormField } from '../../../../utils/checkFormFields';
import { adminTeam } from '../../../../services/admin/adminTeam';
import { TeamMember } from '../../../../types/TeamMember';
import { teamSlice } from '../../../../features/teamSlice';
import classNames from 'classnames';
import { TextInput } from '../../components/FormComponents/components/TextInput';
import { ImageInput } from '../../components/FormComponents/components/ImageInput';
import { TextAreaInput } from '../../components/FormComponents/components/TextAreaInput';
import { Loader } from '../../../../components/Loader';
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type initialFormState = {
  name: string;
  image: null | File;
  position: string;
  description: string;
};

const defaultErrors = {
  name: '',
  image: '',
  position: '',
  description: '',
};

export const TeamForm = () => {
  const { displayForm, setDisplayForm, selectedItem } = useContext(FormContext);
  const [errors, setErrors] = useState<{ [key: string]: string }>(
    defaultErrors,
  );
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { setAuthorized } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormError = (err: any) => {
    if (err.message && err.message.includes('401')) {
      setAuthorized(false);
      navigate('/login');
    }
    setFormError('Something went wrong! Try again later!');
  };

  const defaultValue = useMemo(() => {
    return {
      name: selectedItem && 'name' in selectedItem ? selectedItem.name : '',
      image:
        selectedItem && 'image' in selectedItem ? selectedItem.image : null,
      description:
        selectedItem && 'description' in selectedItem
          ? selectedItem.description
          : '',
      position:
        selectedItem && 'position' in selectedItem ? selectedItem.position : '',
    } as initialFormState;
  }, [selectedItem]);

  const [formField, setFormField] = useState<initialFormState>(defaultValue);
  const updateInput = (fieldTitle: string) => {
    return (newValue: string | File | null) => {
      setFormField(prevValue => ({ ...prevValue, [fieldTitle]: newValue }));
      setErrors(defaultErrors);
      setFormError('');
    };
  };

  useEffect(() => {
    setFormField(defaultValue);
  }, [selectedItem]);

  const [token] = useSessionStorage('token', '');
  const dispatch = useAppDispatch();

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
      name: formField.name,
      position: formField.position,
      description: formField.description,
    };

    formData.append(
      'requestDto',
      new Blob([JSON.stringify(restdata)], { type: 'application/json' }),
    );

    if (formField.image && typeof formField.image !== 'string') {
      formData.append('image', formField.image);
    }

    if (selectedItem) {
      adminTeam
        .update(selectedItem.id, formData, token)
        .then((updatedTeamMember: TeamMember) => {
          dispatch(teamSlice.actions.update(updatedTeamMember));
          clearForm();
        })
        .catch(handleFormError)
        .finally(() => setLoading(false));
    } else {
      adminTeam
        .post(formData, token)
        .then((newTeamMember: TeamMember) => {
          dispatch(teamSlice.actions.add(newTeamMember));
          clearForm();
        })
        .catch(handleFormError)
        .finally(() => setLoading(false));
    }
  };

  function clearForm() {
    setFormField({
      name: '',
      image: null,
      description: '',
      position: '',
    });

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
        className={`${styles.backButton} button button--transparent`}
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
          fieldError={errors?.name || ''}
          placeHolder="Please enter full name"
          updateInput={updateInput('name')}
        />
        <ImageInput
          defaultImage={formField.image}
          updateInput={updateInput('image')}
          fieldError={errors?.image || ''}
        />
        <TextInput
          fieldTitle="Role"
          fieldValue={formField.position}
          fieldError={errors?.position || ''}
          placeHolder="Please enter role"
          updateInput={updateInput('position')}
        />
        <TextAreaInput
          fieldValue={formField.description}
          fieldError={errors?.description || ''}
          placeHolder={'Type the favourite quote...'}
          updateInput={updateInput('description')}
          basicHeight={true}
        />

        {formError && <p className="formField__notValid--text">{formError}</p>}

        <div className={styles.buttons}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <button
                type="submit"
                className={`form__button button button--yellow button--secondary`}
              >
                SAVE
              </button>
              <button
                className={`form__button button  button--transparent button--secondary`}
                onClick={e => {
                  e.preventDefault();
                  clearForm();
                }}
              >
                RESET
              </button>
            </>
          )}
        </div>
      </form>
    </section>
  );
};

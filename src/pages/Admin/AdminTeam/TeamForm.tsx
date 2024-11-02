import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import { TextInput } from '../AdminForm/components/Inputs/TextInput';
import { TextAreaInput } from '../AdminForm/components/Inputs/TextAreaInput';
import { ImageInput } from '../AdminForm/components/Inputs/ImageInput';
import classNames from 'classnames';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { FormContext } from '../../../context/FormContext';
import { adminTeam } from '../../../services/admin/adminTeam';
import { checkAdminFormField } from '../../../utils/checkFormFields';
import { teamSlice } from '../../../features/teamSlice';
import { useAppDispatch } from '../../../app/hooks';
import { TeamMember } from '../../../types/TeamMember';
import { Loader } from '../../../components/Loader';
import { getNormalized } from '../../../utils/getNormalized';
import styles from '../AdminForm/Form.module.scss';

type initialFormState = {
  name: string;
  image: null | File;
  position: string;
  description: string;
};

type ValidationErrors<T> = {
  [K in keyof T]?: string | null;
};

export const TeamForm = () => {
  const { displayForm, setDisplayForm, selectedItem } = useContext(FormContext);
  const [errors, setErrors] = useState<ValidationErrors<initialFormState>>();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

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

    // if (checkAdminFormField(formField)) {
    //   return;
    // }

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
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else {
      adminTeam
        .post(formData, token)
        .then((newTeamMember: TeamMember) => {
          dispatch(teamSlice.actions.add(newTeamMember));
          clearForm();
        })
        .catch(err => console.error(err))
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
          fieldError={errors?.name || ''}
          placeHolder="Please enter full name"
          updateInput={updateInput('name')}
        />
        <ImageInput
          defaultImage={formField.image}
          updateInput={updateInput('image')}
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
            </>
          )}
        </div>
      </form>
    </section>
  );
};

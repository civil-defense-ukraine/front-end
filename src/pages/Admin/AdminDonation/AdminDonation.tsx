/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useContext, useEffect, useState } from 'react';
import { activeDonation } from '../../../services/public/activeDonation';
import styles from './AdminDonation.module.scss';
import { Loader } from '../../../components/Loader';
import { ImageInput } from '../components/FormComponents/components/ImageInput';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminActiveDonation } from '../../../services/admin/adminActiveDonation';
import { useSessionStorage } from '../../../hooks/useSessionStorage';

export const AdminDonation = () => {
  const [formField, setFormField] = useState<null | File | string>(null);

  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuthorized } = useContext(AuthContext);
  const [token] = useSessionStorage('token', '');
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    activeDonation
      .get()
      .then(activeDonation => {
        const { image } = activeDonation;
        setFormField(image);
      })
      .catch(() => {
        setFormError('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateInput = () => {
    return (newValue: string | File | null) => {
      setFormField(newValue);
      setError('');
      setFormError('');
    };
  };

  const handleFormError = (err: any) => {
    if (err.message && err.message.includes('401')) {
      setAuthorized(false);
      navigate('/login');
    }

    console.log(err);
    setFormError('Something went wrong! Try again later!');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!formField || typeof formField === 'string') {
      setError('Please choose an image!');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', formField);

    adminActiveDonation
      .post(formData, token)
      .then(response => {
        console.log(response);
      })
      .catch(handleFormError)
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} form`}
      autoComplete="off"
      noValidate
    >
      <ImageInput
        defaultImage={formField}
        updateInput={updateInput()}
        isDonationPage={true}
        fieldError={error}
      />
      <div className={styles.info}>
        {formError && <p className="formField__notValid--text">{formError}</p>}
        {loading ? (
          <Loader />
        ) : (
          <div className={styles.buttons}>
            <button
              type="submit"
              className={`${styles.button} button--yellow button--secondary`}
            >
              SAVE
            </button>

            <button
              className={`${styles.button} button--transparent button--secondary`}
              onClick={e => {
                e.preventDefault();
                setFormField(null);
              }}
            >
              RESET
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

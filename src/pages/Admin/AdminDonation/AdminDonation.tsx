import { useEffect, useState } from 'react';
import { activeDonation } from '../../../services/public/activeDonation';
import { ImageInput } from '../AdminForm/components/Inputs/ImageInput';
import styles from './AdminDonation.module.scss';
import { TextInput } from '../AdminForm/components/Inputs/TextInput';
import { Loader } from '../../../components/Loader';

export const AdminDonation = () => {
  const [donation, setDonation] = useState('');
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    activeDonation.get().then((response) => {
      setDonation(response.image);
    })
      .catch(() => {
        setFormError(true);
      })
      .finally(() => {
      setLoading(false);
    });
  }, []);
  return (
    <section className={styles.container}>
      <form className={`${styles.form} form`} autoComplete="off" noValidate>
        <ImageInput
          defaultImage={donation}
          updateInput={() => {
            console.log();
          }}
          isDonationPage={true}
        />
        <div className={styles.info}>
          <TextInput
            fieldTitle="Image description"
            fieldValue={''}
            fieldError={''}
            placeHolder="Please enter the image description"
            updateInput={() => {
              console.log();
            }}
          />
          {formError && (
            <p className="formField__notValid--text">{formError}</p>
          )}
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
                onClick={() => {
                  console.log();
                }}
              >
                RESET
              </button>
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

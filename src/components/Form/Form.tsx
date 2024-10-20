import { FormEvent, useState } from 'react';
import styles from './Form.module.scss';
import classNames from 'classnames';
import { checkFormField } from '../../utils/checkFormFields';
import { form } from '../../services/public/form';
import { FormFields } from '../../types/FormFields';
import { Loader } from '../Loader';
import { error } from 'console';

export const Form = () => {
  // const [field, setField] = useState<FormFields>({
  //   email: '',
  //   subject: '',
  //   isVolunteer: false,
  //   message: '',
  // });
  const [field, setField] = useState<FormFields>({
    email: 'test@gmail.com',
    subject: 'test',
    isVolunteer: false,
    message: 'test1',
  });

  const [errors, setErrors] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateInput = (currentField: string, newValue: string | boolean) => {
    setField(prevState => ({ ...prevState, [`${currentField}`]: newValue }));
    setErrors({
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const normalizedField = {
      email: field.email.trim(),
      subject: field.subject.trim(),
      message: field.message.trim(),
    };

    setErrors(checkFormField(normalizedField));
    if (errors.email || errors.message || errors.subject) {
      return;
    }

    console.log(
      Object.entries({ ...normalizedField, isVolunteer: field.isVolunteer }),
    );

    form
      .post({ ...normalizedField, isVolunteer: field.isVolunteer })
      .then(() => {
        setField({
          email: '',
          subject: '',
          isVolunteer: false,
          message: '',
        });
      })
      .catch(() => {
        setFormError(true);
        setTimeout(() => {
          setFormError(false);
        }, 5000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className={styles.container} id="contact-form">
      <h2 className={`${styles.header} heading--h2`}>Contact Us</h2>
      <form
        className="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">
          Your email adress
          <br />
          <input
            className={classNames(`formField`, {
              formField__notValid: errors.email,
            })}
            value={field.email}
            onChange={e => {
              updateInput('email', e.target.value);
            }}
            type="email"
            name="email"
            id="email"
            placeholder="email@gmail.com"
          />
          {errors.email && (
            <p className="formField__notValid--text">{errors.email}</p>
          )}
        </label>

        <label htmlFor="suject">
          Subject
          <br />
          <input
            type="text"
            name="suject"
            className={classNames(`formField`, {
              formField__notValid: errors.subject,
            })}
            value={field.subject}
            onChange={e => {
              updateInput('subject', e.target.value);
            }}
            id="suject"
            placeholder="Type the topic of your request"
          />
          {errors.subject && (
            <p className="formField__notValid--text">{errors.subject}</p>
          )}
        </label>

        <label htmlFor="volunteer" className="form__checkbox--label">
          <input
            type="checkbox"
            name="volunteer"
            id="volunteer"
            defaultChecked={field.isVolunteer}
            className={styles.checkbox}
            onChange={() => updateInput('isVolunteer', !field.isVolunteer)}
          />
          I want to become your volunteer
        </label>
        <label htmlFor="messageText">
          Description
          <br />
          <textarea
            className={classNames(`form__textArea formField`, {
              formField__notValid: errors.message,
            })}
            placeholder="Type your notes..."
            value={field.message}
            onChange={e => {
              updateInput('message', e.target.value);
            }}
          ></textarea>
          {errors.message && (
            <p className="formField__notValid--text">{errors.message}</p>
          )}
          <p className={styles.text}>
            Please enter the details of your request. A member of our support
            staff will respond as soon as possible.
          </p>
        </label>
        <div className={styles.button}>
          {loading && <Loader />}
          {!loading && formError && (
            <p className="formField__notValid--text">
              Something went wrong! Try again later!
            </p>
          )}
          {!loading && !formError && (
            <button
              type="submit"
              className={`form__button button--yellow button--secondary`}
            >
              SUBMIT
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

import classNames from 'classnames';
import styles from './LoginPage.module.scss';
import { FormEvent, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Loader } from '../../../components/Loader';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    username: '',
    password: '',
  });
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const updateErrors = (name: string, value: string) => {
    setErrors(prevValue => ({ ...prevValue, [name]: value }));
  };

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const normalizedField: { [key: string]: string } = {
      username: username.trim(),
      password: password.trim(),
    };
    const errors: { [key: string]: string } = {
      username: '',
      password: '',
    };

    for (const field in normalizedField) {
      if (normalizedField[field].length === 0) {
        errors[field] = 'This field is required!';
      }
    }

    setErrors(errors);

    if (errors.password || errors.username) {
      setLoading(false);
      return;
    }

    login(username, password)
      .then(() => {
        console.log(state.pathname);

        navigate(state.pathname || '/', { replace: true });
      })
      .catch(() => {
        setFormError('Username and password are required!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <section className={styles.container}>
      <h2 className={`heading--h2`}>Admin Login</h2>

      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="login">
          <p>Username</p>
          <input
            className={classNames(`formField`, {
              formField__notValid: errors.username || formError,
            })}
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              updateErrors('username', '');
              setFormError('');
            }}
            type="text"
            id="login"
          />
          {errors.username && (
            <p className="formField__notValid--text">{errors.username}</p>
          )}
        </label>
        <label htmlFor="password" className={styles.password}>
          <p>Password</p>
          <input
            className={classNames(`formField`, {
              formField__notValid: errors.password || formError,
            })}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              updateErrors('password', '');
              setFormError('');
            }}
            type={type}
            id="password"
          />
          <Icon
            className={classNames(styles.password__icon, {
              [styles.password__icon__active]: type === 'text',
            })}
            icon={icon}
            size={24}
            onClick={handleToggle}
          />
          {errors.password && (
            <p className="formField__notValid--text">{errors.password}</p>
          )}
        </label>

        {loading && (
          <div className="form__button">
            <Loader />
          </div>
        )}
        {formError && (
          <p className="form__button formField__notValid--text">{formError}</p>
        )}
        <button
          type="submit"
          className={`form__button button--yellow button--secondary`}
        >
          SUBMIT
        </button>
      </form>
    </section>
  );
};

export default LoginPage;

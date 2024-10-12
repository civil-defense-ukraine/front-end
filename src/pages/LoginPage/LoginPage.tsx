import classNames from 'classnames';
import styles from './LoginPage.module.scss';
import { FormEvent, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(username, password)
      .then(() => {
        navigate(state.pathname || '/', { replace: true });
      })
      .catch(e => {
        setError(e);
      });
  }

  return (
    <section className={styles.container}>
      <h2 className={`heading--h2`}>Admin Login</h2>

      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="login">
          <p>Username</p>
          <input
            className="formField"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              setError('');
            }}
            type="text"
            id="login"
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            className={classNames(`formField`, {
              formField__notValid: error,
            })}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setError('');
            }}
            type="password"
            id="password"
          />
          {error && <p className="formField__notValid--text">{error}</p>}
        </label>

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

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'components/Container';
import Notification from 'components/Notification';
import Loader from 'components/Loader';

import authOperations from 'redux/auth/auth-operations';
import { getLoadingUser, getErrorLogin } from 'redux/auth/auth-selectors';
import * as authActions from 'redux/auth/auth-actions';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('bnm@mail.com'); // очистить
  const [password, setPassword] = useState('1234567'); // очистить

  const error = useSelector(getErrorLogin);
  const isLoadingUser = useSelector(getLoadingUser);

  const inputRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => dispatch(authActions.clearError()), [dispatch]);
  useEffect(() => inputRef.current.focus(), []);

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const user = { email, password };
    dispatch(authOperations.logIn(user));

    reset();
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      {isLoadingUser && <Loader />}
      {error && <Notification message={error} type="error" />}

      <form
        className={styles.SignUpForm}
        onSubmit={handleFormSubmit}
        autoComplete="off"
      >
        <label className={styles.formLabel}>
          <span className={styles.formText}>E-mail:</span>
          <input
            type="email"
            className={styles.formInput}
            placeholder="Enter e-mail"
            name="email"
            value={email}
            onChange={handleChange}
            ref={inputRef}
            required
          />
        </label>
        <label className={styles.formLabel}>
          <span className={styles.formText}>Password:</span>
          <input
            type="password"
            className={styles.formInput}
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>

        <button className={styles.formBtn} type="submit">
          Log in
        </button>
      </form>
    </Container>
  );
};

export default LoginPage;

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'components/Container';
import Notification from 'components/Notification';
import Loader from 'components/Loader';
import UserVerification from 'pages/UserVerification';

import authOperations from 'redux/auth/auth-operations';
import {
  getNeedVerify,
  getLoadingUser,
  getErrorSignup,
} from 'redux/auth/auth-selectors';
import * as authActions from 'redux/auth/auth-actions';

import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  const [name, setName] = useState(''); //todo очистить
  const [email, setEmail] = useState(''); //todo очистить
  const [password, setPassword] = useState(''); //todo очистить
  const [agreed, setAgreed] = useState(false);

  // const [needVerify, setNeedVerify] = useState(false);

  const inputRef = useRef();

  const error = useSelector(getErrorSignup);
  const isLoadingUser = useSelector(getLoadingUser);
  const needVerify = useSelector(getNeedVerify);

  const dispatch = useDispatch();

  useEffect(() => dispatch(authActions.clearError()), [dispatch]);
  useEffect(() => {
    inputRef?.current?.focus();
    // setEmail('');
  }, []);

  const handleChange = event => {
    const { name, value, checked } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      case 'agreed':
        setAgreed(checked);
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const user = { name, email, password };
    dispatch(authOperations.signUp(user));

    // setNeedVerify(true);

    reset();
  };

  const reset = () => {
    setName('');
    // setEmail('');
    setPassword('');
    setAgreed(false);
  };

  return (
    <Container>
      {isLoadingUser && <Loader />}
      {error === 'Request failed with status code 401' && (
        <UserVerification emailVerify={email} />
      )}
      {error === 'Request failed with status code 409' && (
        <Notification message={'This email is already in use'} type="error" />
      )}
      {error === 'Request failed with status code 400' && (
        <Notification
          message={
            'Your IP has reached the account creation limit within an hour, please try again later'
          }
          type="error"
        />
      )}
      {needVerify && <UserVerification emailVerify={email} />}

      <form
        className={styles.SignUpForm}
        onSubmit={handleFormSubmit}
        autoComplete="off"
      >
        <label className={styles.formLabel}>
          <span className={styles.formText}>Name:</span>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={handleChange}
            ref={inputRef}
            required
          />
        </label>
        <label className={styles.formLabel}>
          <span className={styles.formText}>E-mail:</span>
          <input
            type="email"
            className={styles.formInput}
            placeholder="Enter e-mail"
            name="email"
            value={email}
            onChange={handleChange}
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
            pattern="^[a-z0-9_-]{7,18}$"
            title="Password length cannot be shorter than 7 characters, can contain letters, numbers, hyphens and underscores"
            required
          />
        </label>

        <label className={styles.labelCheckbox}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="agreed"
            checked={agreed}
            onChange={handleChange}
            title="Check the box to register"
            required
          />
          <span>I agree to the terms of service</span>
        </label>

        <button className={styles.formBtn} type="submit">
          Sign up
        </button>
      </form>
    </Container>
  );
};

export default SignUpPage;

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Notification from 'components/Notification';
import { getRepeatVerify } from 'redux/auth/auth-selectors';
import authOperations from 'redux/auth/auth-operations';

import styles from './UserVerification.module.scss';

const UserVerification = ({ emailVerify }) => {
  // const [isVerify, setIsVerify] = useState(false);
  const [email, setEmail] = useState(emailVerify);

  const repeatVerify = useSelector(getRepeatVerify);

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      default:
        return;
    }
  };

  const handleResendVerification = event => {
    event.preventDefault();

    dispatch(authOperations.repeatVerification({ email }));
  };

  return (
    <div className={styles.verifyWrapper}>
      <p>
        Your profile requires verification. Please go to your email and confirm
        it.
      </p>

      <p>If you have not received the letter - enter your email to resend</p>
      <form onClick={handleResendVerification}>
        <label className={styles.formLabel}>
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
        <button className={styles.formBtn} type="submit">
          Resend
        </button>
      </form>
      {repeatVerify && <Notification message={repeatVerify} />}
    </div>
  );
};

export default UserVerification;

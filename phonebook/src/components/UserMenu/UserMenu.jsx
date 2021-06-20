import { useSelector, useDispatch } from 'react-redux';

import { getUserName } from 'redux/auth/auth-selectors';
import authOperations from 'redux/auth/auth-operations';

import avatar from 'images/avatar.png';
import styles from './UserMenu.module.scss';

const UserMenu = () => {
  const name = useSelector(getUserName);
  const dispatch = useDispatch();

  const logOutHandler = () => dispatch(authOperations.logOut());

  return (
    <div className={styles.UserMenu}>
      <div className={styles.userInfo}>
        <img className={styles.avatar} src={avatar} alt="cat" />

        <div className={styles.userText}>
          <span className={styles.text}>{name}!</span>
          <span className={styles.text}>Welcome!</span>
        </div>
      </div>

      <button className={styles.logoutBtn} onClick={logOutHandler}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;

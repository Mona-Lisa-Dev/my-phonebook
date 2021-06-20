import { useSelector } from 'react-redux';

import Navigation from 'components/Navigation';
import AuthNav from 'components/AuthNav';
import UserMenu from 'components/UserMenu';

import { getIsAuthorized } from 'redux/auth/auth-selectors';

import styles from './AppBar.module.scss';

const AppBar = () => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <div className={styles.AppBar}>
      <Navigation />
      {isAuthorized ? <UserMenu /> : <AuthNav />}
    </div>
  );
};

export default AppBar;

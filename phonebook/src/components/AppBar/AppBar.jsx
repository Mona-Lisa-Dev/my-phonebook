import { useSelector } from 'react-redux';

import ThemeButton from 'components/ThemeButton';
import Navigation from 'components/Navigation';
import AuthNav from 'components/AuthNav';
import UserMenu from 'components/UserMenu';

import { getIsAuthorized } from 'redux/auth/auth-selectors';

import styles from './AppBar.module.scss';

const AppBar = ({ theme, themeToggler }) => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <div className={styles.AppBar}>
      <Navigation />
      <div className={styles.authNavWrapper}>
        <ThemeButton theme={theme} themeToggler={themeToggler} />
        {isAuthorized ? <UserMenu /> : <AuthNav />}
      </div>
    </div>
  );
};

export default AppBar;

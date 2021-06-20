import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getIsAuthorized } from 'redux/auth/auth-selectors';

import routes from 'routes';
import logo from 'images/logo.png';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <nav className={styles.Navigation}>
      <NavLink
        exact
        to={routes.home}
        className={styles.LogoLink}
        activeClassName={styles.LogoLinkActive}
      >
        <img src={logo} alt="logo" />
      </NavLink>

      {isAuthorized && (
        <NavLink
          to={routes.contacts}
          className={styles.NavLink}
          activeClassName={styles.NavLinkActive}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;

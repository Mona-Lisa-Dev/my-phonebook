import { NavLink } from 'react-router-dom';

import routes from 'routes';
import styles from './AuthNav.module.scss';

const AuthNav = () => (
  <div className={styles.AuthNav}>
    <NavLink
      to={routes.signup}
      className={styles.NavLink}
      activeClassName={styles.NavLinkActive}
    >
      Sign up
    </NavLink>

    <NavLink
      to={routes.login}
      className={styles.NavLink}
      activeClassName={styles.NavLinkActive}
    >
      Log in
    </NavLink>
  </div>
);

export default AuthNav;

import { useState, useEffect, lazy, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppBar from 'components/AppBar';
import Loader from 'components/Loader';
import Container from 'components/Container';

import authOperations from 'redux/auth/auth-operations';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import routes from 'routes';

import styles from './App.module.scss';

const HomePage = lazy(() =>
  import('pages/HomePage' /* webpackChunkName: "HomePage" */),
);
const UserPage = lazy(() =>
  import('pages/UserPage' /* webpackChunkName: "UserPage" */),
);
const SignUpPage = lazy(() =>
  import('pages/SignUpPage' /* webpackChunkName: "SignUpPage" */),
);
const LoginPage = lazy(() =>
  import('pages/LoginPage' /* webpackChunkName: "LoginPage" */),
);

const App = () => {
  const [theme, setTheme] = useState('light');

  const classNameApp = theme === 'light' ? styles.lightTheme : styles.darkTheme;

  const themeToggler = () => {
    if (theme === 'light') {
      setTheme('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      window.localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    if (localTheme) {
      setTheme(localTheme);
    } else {
      window.localStorage.setItem('theme', 'light');
    }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => dispatch(authOperations.getCurrentUserData()), [dispatch]);

  return (
    <div className={classNameApp}>
      <Container>
        <AppBar theme={theme} themeToggler={themeToggler} />

        <Suspense fallback={<Loader />}>
          <Switch>
            <PublicRoute path={routes.home} exact component={HomePage} />
            <PrivateRoute
              path={routes.contacts}
              redirectTo={routes.login}
              component={UserPage}
            />
            <PublicRoute
              path={routes.signup}
              redirectTo={routes.contacts}
              restricted
              component={SignUpPage}
            />
            <PublicRoute
              path={routes.login}
              redirectTo={routes.contacts}
              restricted
              component={LoginPage}
            />

            <Redirect to={routes.home} />
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;

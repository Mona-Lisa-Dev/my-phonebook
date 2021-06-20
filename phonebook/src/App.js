import { useEffect, lazy, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppBar from 'components/AppBar';
import Loader from 'components/Loader';
import Container from 'components/Container';

import authOperations from 'redux/auth/auth-operations';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import routes from 'routes';

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
  const dispatch = useDispatch();
  useEffect(() => dispatch(authOperations.getCurrentUserData()), [dispatch]);

  return (
    <Container>
      <AppBar />

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
  );
};

export default App;

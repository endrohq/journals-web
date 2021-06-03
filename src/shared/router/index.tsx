import React, {lazy} from 'react';
import { Switch, Route } from 'react-router-dom';
import {LazyLoad} from "src/components/loaders/LazyLoad";
import { ROUTES } from './routes';

import { ProtectedRoute } from './ProtectedRoute';

const Delegates = LazyLoad(lazy(() => import('src/pages/delegates/Delegates')))
const LogoutPage = LazyLoad(lazy(() => import('../../pages/logout/LogoutPage')))
const InitialiseAccount = LazyLoad(lazy(() => import('../../pages/initialise-account/InitialiseAccount')))
const Home = LazyLoad(lazy(() => import('../../pages/home/Home')))
const LoginPage = LazyLoad(lazy(() => import('../../pages/login/LoginPage')))
const Account = LazyLoad(lazy(() => import('../../pages/account/AccountDetails')))

export const ApplicationRoutes: React.FC = () => {
  return (
    <Switch>
      <ProtectedRoute exact path={ROUTES.HOME} component={Home} />

      <Route exact path={ROUTES.DELEGATES} component={Delegates} />
      <Route exact path={ROUTES.ACCOUNT_DETAILS} component={Account} />
      <Route exact path={ROUTES.LOGOUT} component={LogoutPage} />
      <Route exact path={ROUTES.LOGOUT} component={LogoutPage} />

      <Route exact path={ROUTES.INITIALISE} component={InitialiseAccount} />

      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
    </Switch>
  );
};

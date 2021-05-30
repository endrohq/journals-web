import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ROUTES } from './routes';

import Home from '../../pages/home-page/Home';
import { LoginPage } from '../../pages/login/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
import InitialiseAccount from '../../pages/initialise-account/InitialiseAccount';
import { LogoutPage } from '../../pages/logout/LogoutPage';

export const ApplicationRoutes: React.FC = () => {
  return (
    <Switch>
      <ProtectedRoute exact path={ROUTES.HOME} component={Home} />

      <Route exact path={ROUTES.LOGOUT} component={LogoutPage} />

      <Route exact path={ROUTES.INITIALISE} component={InitialiseAccount} />

      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
    </Switch>
  );
};

import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LazyLoad } from 'src/components/loaders/LazyLoad';
import { ROUTES } from './routes';

import { ProtectedRoute } from './ProtectedRoute';

const Account = LazyLoad(lazy(() => import('../../pages/account/Account')));
const CreateEvent = LazyLoad(
  lazy(() => import('src/pages/create-event/CreateEvent'))
);
const Delegates = LazyLoad(lazy(() => import('src/pages/delegates/Delegates')));
const EventItem = LazyLoad(
  lazy(() => import('src/pages/event-item/EventItem'))
);
const Home = LazyLoad(lazy(() => import('../../pages/home/Home')));
const InitialiseAccount = LazyLoad(
  lazy(() => import('../../pages/initialise-account/InitialiseAccount'))
);
const LoginPage = LazyLoad(lazy(() => import('../../pages/login/LoginPage')));
const LogoutPage = LazyLoad(
  lazy(() => import('../../pages/logout/LogoutPage'))
);
const Subscription = LazyLoad(
  lazy(() => import('../../pages/subscription/Subscription'))
);
const TransactionDetails = LazyLoad(
  lazy(() => import('../../pages/transaction-details/TransactionDetails'))
);
const TreasuryPage = LazyLoad(
  lazy(() => import('../../pages/treasury/TreasuryPage'))
);

const MyEvents = LazyLoad(lazy(() => import('../../pages/my-events/MyEvents')));

export const ApplicationRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <ProtectedRoute
        exact
        path={ROUTES.CREATE_EVENT}
        component={CreateEvent}
      />
      <ProtectedRoute
        exact
        path={ROUTES.SUBSCRIPTION}
        component={Subscription}
      />
      <ProtectedRoute exact path={ROUTES.MY_EVENTS} component={MyEvents} />

      <Route exact path={ROUTES.DELEGATES} component={Delegates} />
      <Route exact path={ROUTES.EVENT_DETAILS} component={EventItem} />
      <Route exact path={ROUTES.ACCOUNT_DETAILS} component={Account} />
      <Route exact path={ROUTES.LOGOUT} component={LogoutPage} />
      <Route exact path={ROUTES.LOGOUT} component={LogoutPage} />

      <Route exact path={ROUTES.INITIALISE} component={InitialiseAccount} />

      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      <Route
        exact
        path={ROUTES.TRANSACTION_DETAILS}
        component={TransactionDetails}
      />
      <Route exact path={ROUTES.TREASURY} component={TreasuryPage} />
    </Switch>
  );
};

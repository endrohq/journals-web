export const ROUTES = {
  ACCOUNT_DETAILS: '/address/:address',
  CREATE_EVENT: '/events/create',
  DELEGATES: '/delegates',
  EVENT_DETAILS: '/events/:id',
  HOME: '/',
  INITIALISE: '/initialise',
  LOGIN: '/login',
  LOGOUT: '/logout',
  SETTINGS: '/settings',
  SUBSCRIPTION: '/subscription',
  TREASURY: '/treasury',
  TRANSACTION_DETAILS: '/tx/:txId',
  VOTING: '/voting',
  MY_EVENTS: '/my-events'
};

export const getEventDetailsRoute = (id: string) => {
  return ROUTES.EVENT_DETAILS.replace(':id', id);
};

export const getAccountDetailsRoute = (address: string) => {
  return ROUTES.ACCOUNT_DETAILS.replace(':address', address);
};

export const getTransactionDetailsRoute = (txId: string) => {
  return ROUTES.TRANSACTION_DETAILS.replace(':txId', txId);
};

export const getLoginRouteWithRedirect = (pathname: string) => {
  return `${ROUTES.LOGIN}?prevRoute=${pathname} `;
};

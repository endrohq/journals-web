export const ROUTES = {
  ACCOUNT_DETAILS: '/address/:address',
  CREATE_EVENT: '/events/create',
  DELEGATES: '/delegates',
  HOME: '/',
  INITIALISE: '/initialise',
  LOGIN: '/login',
  LOGOUT: '/logout',
  GAMES: '/games',
  SETTINGS: '/settings',
  TOURNAMENT_PAGE: '/:gameId/tournaments/:id',
  TRANSACTION_DETAILS: '/tx/:txId',
  VOTING: '/voting'
};

export const getAccountDetailsRoute = (address: string) => {
  return ROUTES.ACCOUNT_DETAILS.replace(':address', address);
};

export const getTransactionDetailsRoute = (txId: string) => {
  return ROUTES.TRANSACTION_DETAILS.replace(':txId', txId);
};

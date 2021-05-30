

export const ROUTES = {
  ACCOUNT_DETAILS: '/address/:address',
  CREATE_GAME: '/games/create',
  DELEGATES: '/delegates',
  GAME_DETAILS: '/games/:gameId',
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
  return ROUTES.ACCOUNT_DETAILS
    .replace(':address', address);
}

export const getGamesItemRoute = (gameId: string) => {
  return ROUTES.GAME_DETAILS
    .replace(':gameId', gameId);
}

export const getGameTournamentItemRoute = (gameId: string, id: string) => {
  return ROUTES.TOURNAMENT_PAGE
    .replace(':gameId', gameId)
    .replace(':id', id);
}

export const getTransactionDetailsRoute = (txId: string) => {
  return ROUTES.TRANSACTION_DETAILS
    .replace(':txId', txId)
}

export const API = {
  requestToken: 'authentication/token/new',
  login: 'authentication/token/validate_with_login',
  sessionId: 'authentication/session/new',
  trendingMovies: 'trending/movie/day?language=en-US&page=',
  ratingMovies: 'movie/',
  getRatedMovies:
    'account/21292119/rated/movies?language=en-US&page=1&session_id=',
  addWatchlist: 'account/21292119/watchlist?session_id=',
  getWatchlist:
    'account/21292119/watchlist/movies?language=en-US&page=1&session_id=',
  deleteSession: 'authentication/session',
  trendingPerson: 'trending/person/day?language=en-US&page=',
};

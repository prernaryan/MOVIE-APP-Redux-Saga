import {all, fork} from 'redux-saga/effects';
import {
  watchLoginSaga,
  watchLogoutSaga,
  watchSessionSaga,
  watchTokenSaga,
} from './authSaga';
import {
  watchDeleteRateMovie,
  watchGetRatedMovie,
  watchRateMovie,
  watchtrendingMoviesSaga,
} from './homeSaga';
import {watchAddWatchList, watchGetWatchlist} from './watchlistSaga';
import {watchtrendingPeopleSaga} from './trendingPeopleSaga';

export default function* rootSaga() {
  yield all([
    fork(watchTokenSaga),
    fork(watchLoginSaga),
    fork(watchSessionSaga),
    fork(watchtrendingMoviesSaga),
    fork(watchRateMovie),
    fork(watchDeleteRateMovie),
    fork(watchGetRatedMovie),
    fork(watchAddWatchList),
    fork(watchGetWatchlist),
    fork(watchLogoutSaga),
    fork(watchtrendingPeopleSaga),
  ]);
}

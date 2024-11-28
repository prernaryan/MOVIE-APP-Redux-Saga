import {
  ADD_WATCHLIST,
  ADD_WATCHLIST_SUCCESS,
  ADD_WATCHLIST_FAIL,
  GET_WATCHLIST,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_FAIL,
} from '../Type';

interface AddWatchState {
  addWatchlistRes: {loading: boolean; error: string | null; success: boolean};
  getWatchlistRes: {
    loading: boolean;
    error: string | null;
    data: any[] | null;
    success: boolean;
  };
}

const initialState: AddWatchState = {
  addWatchlistRes: {
    loading: false,
    error: null,
    success: false,
  },
  getWatchlistRes: {
    loading: false,
    error: null,
    data: null,
    success: false,
  },
};

export const watchlistReducer = (
  state = initialState,
  action: any,
): AddWatchState => {
  switch (action.type) {
    case ADD_WATCHLIST:
      return {
        ...state,
        addWatchlistRes: {loading: true, error: null, success: false},
      };
    case ADD_WATCHLIST_SUCCESS:
      return {
        ...state,
        addWatchlistRes: {loading: false, success: true, error: null},
      };
    case ADD_WATCHLIST_FAIL:
      return {
        ...state,
        addWatchlistRes: {loading: false, error: action.data, success: false},
      };
    case GET_WATCHLIST:
      return {
        ...state,
        getWatchlistRes: {
          loading: true,
          error: null,
          data: null,
          success: false,
        },
      };
    case GET_WATCHLIST_SUCCESS:
      return {
        ...state,
        getWatchlistRes: {
          loading: false,
          error: null,
          data: action.data,
          success: true,
        },
      };
    case GET_WATCHLIST_FAIL:
      return {
        ...state,
        getWatchlistRes: {
          loading: false,
          error: action.data,
          data: null,
          success: false,
        },
      };
    default:
      return state;
  }
};

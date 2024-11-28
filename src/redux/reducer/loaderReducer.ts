import {HIDE_LOADER, SHOW_LOADER} from '../Type';

interface LoaderState {
  loading: boolean;
  text: string;
}
const initState: LoaderState = {
  loading: false,
  text: '',
};
interface ShowLoaderAction {
  type: typeof SHOW_LOADER;
  payload: {text: string};
}

interface HideLoaderAction {
  type: typeof HIDE_LOADER;
}
type LoaderAction = ShowLoaderAction | HideLoaderAction;
// Reducer with proper types
export default (
  state: LoaderState = initState,
  action: LoaderAction,
): LoaderState => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
        text: action.payload.text,
      };
    case HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

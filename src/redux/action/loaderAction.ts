import {HIDE_LOADER, SHOW_LOADER} from '../Type';
interface ShowLoaderAction {
  type: typeof SHOW_LOADER;
  payload: {text: string};
}
interface HideLoaderAction {
  type: typeof HIDE_LOADER;
}

export const showAppLoader = (text: string = ''): ShowLoaderAction => ({
  type: SHOW_LOADER,
  payload: {text},
});

export const hideAppLoader = (): HideLoaderAction => ({
  type: HIDE_LOADER,
});

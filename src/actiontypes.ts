
export const CHANGE_ZOOM = 'CHANGE_ZOOM';
export const CHANGE_CENTER = 'CHANGE_CENTER';
export const HEADLINE_CHANGED = 'HEADLINE_CHANGED';
export const ADD_MARKER = 'MARKER_ADDED';
export const CLEAR_MARKERS = 'CLEAR_MARKERS';
export const INIT_UPDATE = 'INIT_UPDATE';
export const IS_LOADING_POS = 'LOADING_POS';

export interface IAction<T> {
    type: string,
    payload: T
}
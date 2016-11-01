import { combineReducers } from 'redux';
import { IMap, IPos, IMarker } from './map.types';
import { INITIAL_STATE } from './map.initial-state';
import * as actionTypes from './../../actiontypes';

export function centerReducer(state: IPos = INITIAL_STATE.center, {type, payload}) : IPos {
    switch(type){
        case actionTypes.CHANGE_CENTER:
            return payload;
        default:
            return state;
    }
}

export function zoomReducer(state: number = INITIAL_STATE.zoom, {type, payload}) : number {
    return type === actionTypes.CHANGE_ZOOM 
        ? payload
        : state;
}

export function markersReducer(state: Array<IMarker> = INITIAL_STATE.markers, {type, payload}) : Array<IMarker> {
    switch (type) {
        case actionTypes.ADD_MARKER:
            return [ ...state, payload];
        case actionTypes.CLEAR_MARKERS:
            return [];
        default:
            return state;
    }
}

export function isLoadingPosReducer(state: boolean = INITIAL_STATE.isLoadingPosition, {type, payload}) : boolean {
    if (type === actionTypes.IS_LOADING_POS){
        return payload;
    }
    return state;
}

export const mapReducer : (state : IMap, action) => IMap = combineReducers<IMap>({
    center: centerReducer,
    zoom: zoomReducer,
    markers: markersReducer,
    isLoadingPosition: isLoadingPosReducer
});
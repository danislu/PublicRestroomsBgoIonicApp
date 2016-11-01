import { Store, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import * as map from './map';
import { HEADLINE_CHANGED } from './../actiontypes';

export interface IAppState {
    map? : map.IMap;
    headline?: string
};

const headlineReduxer = (state = "", action)=> {
    if (action.type === HEADLINE_CHANGED)
        return action.payload.headline;
    return state;
};

const rootReducer : (state: IAppState, action: any) => IAppState = combineReducers<IAppState>({
    map : map.mapReducer,
    headline : headlineReduxer 
});

const logger = createLogger();
export const store : Store<IAppState> = createStore(
    rootReducer, 
    applyMiddleware(thunk, promise, logger)
);

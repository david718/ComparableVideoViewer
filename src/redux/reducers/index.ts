import { Reducer, combineReducers } from 'redux';

import { ListState, listReducer } from './listReducer';
import { ViewState, viewReducer } from './viewReducer';

export interface RootState {
  list: ListState;
  view: ViewState;
}

export const rootReducer = combineReducers<RootState | undefined>({
  list: listReducer,
  view: viewReducer
});

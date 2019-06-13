import { Reducer, combineReducers } from 'redux';

import { CounterState, counterReducer } from './counterReducer';
import { ListState, listReducer } from './listReducer';
import { ViewState, viewReducer } from './viewReducer';

export interface RootState {
  list: ListState;
  counter: CounterState;
  view: ViewState;
}

export const rootReducer = combineReducers<RootState | undefined>({
  list: listReducer,
  counter: counterReducer,
  view: viewReducer
});

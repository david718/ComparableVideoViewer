import { Reducer } from 'redux';

import { CHANGEBARPOSITION, ViewAction } from '../actions/ViewAction';

export interface ViewState {
  readonly barX: number;
}

const defaultState: ViewState = {
  barX: 0
};

export const viewReducer: Reducer<ViewState, ViewAction> = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGEBARPOSITION:
      return {
        barX: action.payload
      };
    default:
      return state;
  }
};

import { Reducer } from 'redux';

import { CHANGEIMAGE, ViewAction } from '../actions/viewAction';

export interface ViewState {
  readonly viewImageId: string;
}

const defaultState: ViewState = {
  viewImageId: 'sample'
};

export const viewReducer: Reducer<ViewState, ViewAction> = (
  state = defaultState,
  action
): ViewState => {
  switch (action.type) {
    case CHANGEIMAGE:
      return {
        viewImageId: action.payload
      };
    default:
      return state;
  }
};

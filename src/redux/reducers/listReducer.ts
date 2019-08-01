import { Reducer } from 'redux';
import * as _ from 'lodash';

import { SELECTANIM, ADDFILESTOLIST, ListAction, DELETEFROMLIST } from '../actions/ListAction';
import { Anim } from '../../model/Schema';

export interface ListState {
  readonly anims: Anim[];
  readonly selectedAnimId: string;
}

const defaultState: ListState = {
  anims: [],
  selectedAnimId: ''
};

export const listReducer: Reducer<ListState> = (state = defaultState, action: ListAction) => {
  switch (action.type) {
    case SELECTANIM:
      return {
        ...state,
        selectedAnimId: action.payload
      };
    case ADDFILESTOLIST:
      const animPaths = state.anims.map(anim => anim.path);
      const addAnims = action.payload.filter(newAnim => animPaths.indexOf(newAnim.path) === -1);
      return {
        ...state,
        anims: state.anims.concat(addAnims)
      };
    default:
      return state;
  }
};

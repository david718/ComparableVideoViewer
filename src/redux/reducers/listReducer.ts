import { Reducer } from 'redux';
import * as _ from 'lodash';

import {
  SELECTANIM,
  ADDFILESTOLIST,
  DELETEFROMLIST,
  CHANGEBARPOSITION,
  ListAction
} from '../actions/ListAction';
import { Anim } from '../../model/Schema';

export interface ListState {
  readonly anims: Anim[];
  readonly selectedAnimId: string;
  readonly barX: number;
}

const defaultState: ListState = {
  anims: [],
  selectedAnimId: '',
  barX: 0
};

export const listReducer: Reducer<ListState> = (state = defaultState, action: ListAction) => {
  switch (action.type) {
    case SELECTANIM:
      const selectedAnim = state.anims.filter(anim => anim.id === action.payload)[0];
      return {
        ...state,
        selectedAnimId: action.payload,
        barX: selectedAnim.info.streams[0].width / 4
      };
    case ADDFILESTOLIST:
      const animPaths = state.anims.map(anim => anim.path);
      const addAnims = action.payload.filter(newAnim => animPaths.indexOf(newAnim.path) === -1);
      return {
        ...state,
        anims: state.anims.concat(addAnims)
      };
    case DELETEFROMLIST:
      return {
        ...state,
        anims: state.anims.filter(anim => anim.id !== action.payload)
      };
    case CHANGEBARPOSITION:
      return {
        ...state,
        barX: action.payload
      };
    default:
      return state;
  }
};

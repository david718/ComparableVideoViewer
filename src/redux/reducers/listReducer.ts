import { Reducer } from 'redux';
import * as _ from 'lodash';

import {
  SELECTVIDEOLIST,
  SELECTPROCESSORLIST,
  ADDFILESTOLIST,
  DELETEFROMLIST,
  ListAction
} from '../actions/ListAction';
import { Anim } from '../../main/video';
import { Processor } from '../../model/Schema';

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
    case SELECTVIDEOLIST:
      return {
        ...state,
        status: 'imageList'
      };
    case SELECTPROCESSORLIST:
      return {
        ...state,
        status: 'processorList'
      };
    case ADDFILESTOLIST:
      return {
        ...state,
        anims: state.anims.concat(action.payload)
      };
    default:
      return state;
  }
};

import { Reducer } from 'redux';
import * as _ from 'lodash';

import {
  SELECTVIDEOLIST,
  SELECTPROCESSORLIST,
  ADDFILESTOLIST,
  DELETEFROMLIST,
  ListAction
} from '../actions/ListAction';

import { SampleVideo, Processor } from '../../model/Schema';

export interface ListState {
  readonly sampleVideos: SampleVideo[];
  readonly processors: Processor[];
  readonly status: 'imageList' | 'processorList' | 'addFilesToList';
}

const defaultState: ListState = {
  sampleVideos: [],
  processors: [],
  status: 'imageList'
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
        sampleImages: state.sampleVideos.concat(action.payload)
      };
    case DELETEFROMLIST:
      const newSampleVideos = _.cloneDeep(state.sampleVideos);
      _.remove(newSampleVideos, { id: action.payload });
      return {
        ...state,
        sampleVideos: newSampleVideos
      };
    default:
      return state;
  }
};

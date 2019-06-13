import { Reducer } from 'redux';
import * as _ from 'lodash';

import {
  SELECTIMAGELIST,
  SELECTPROCESSORLIST,
  ADDFILESTOLIST,
  DELETEFROMLIST,
  ListAction
} from '../actions/ListAction';

import { SampleImage, Processor } from '../../model/Schema';

export interface ListState {
  readonly sampleImages: SampleImage[];
  readonly processors: Processor[];
  readonly status: 'imageList' | 'processorList' | 'addFilesToList';
}

const defaultState: ListState = {
  sampleImages: [],
  processors: [],
  status: 'imageList'
};

export const listReducer: Reducer<ListState> = (state = defaultState, action: ListAction) => {
  switch (action.type) {
    case SELECTIMAGELIST:
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
        sampleImages: state.sampleImages.concat(action.payload)
      };
    case DELETEFROMLIST:
      const newSampleImages = _.cloneDeep(state.sampleImages);
      _.remove(newSampleImages, { id: action.payload });
      return {
        ...state,
        sampleImages: newSampleImages
      };
    default:
      return state;
  }
};

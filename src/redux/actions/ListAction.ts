import { Action, ActionCreator } from 'redux';

import { SampleVideo } from '../../model/Schema';

export const SELECTVIDEOLIST = 'SELECTVIDEOLIST';
export const SELECTPROCESSORLIST = 'SELECTPROCESSORLIST';
export const ADDFILESTOLIST = 'ADDFILESTOLIST';
export const DELETEFROMLIST = 'DELETEFROMLIST';

export interface SelectVideoAction extends Action {
  type: 'SELECTVIDEOLIST';
}
export interface SelectProcessorAction extends Action {
  type: 'SELECTPROCESSORLIST';
}
export interface AddFileAction extends Action {
  type: 'ADDFILESTOLIST';
  payload: SampleVideo;
}
export interface DeleteFileAction extends Action {
  type: 'DELETEFROMLIST';
  payload: string;
}

export const changeToImage: ActionCreator<SelectVideoAction> = () => ({
  type: SELECTVIDEOLIST
});
export const changeToProcessor: ActionCreator<SelectProcessorAction> = () => ({
  type: SELECTPROCESSORLIST
});
export const addFiles: ActionCreator<AddFileAction> = payload => ({
  payload,
  type: ADDFILESTOLIST
});
export const deleteFile: ActionCreator<DeleteFileAction> = payload => ({
  payload,
  type: DELETEFROMLIST
});

export type ListAction =
  | SelectVideoAction
  | SelectProcessorAction
  | AddFileAction
  | DeleteFileAction;

import { Action, ActionCreator } from 'redux';

import { SampleImage } from '../../model/Schema';

export const SELECTIMAGELIST = 'SELECTIMAGELIST';
export const SELECTPROCESSORLIST = 'SELECTPROCESSORLIST';
export const ADDFILESTOLIST = 'ADDFILESTOLIST';
export const DELETEFROMLIST = 'DELETEFROMLIST';

export interface SelectImageAction extends Action {
  type: 'SELECTIMAGELIST';
}
export interface SelectProcessorAction extends Action {
  type: 'SELECTPROCESSORLIST';
}
export interface AddFileAction extends Action {
  type: 'ADDFILESTOLIST';
  payload: SampleImage;
}
export interface DeleteFileAction extends Action {
  type: 'DELETEFROMLIST';
  payload: string;
}

export const changeToImage: ActionCreator<SelectImageAction> = () => ({
  type: SELECTIMAGELIST
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
  | SelectImageAction
  | SelectProcessorAction
  | AddFileAction
  | DeleteFileAction;

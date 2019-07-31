import { Action, ActionCreator } from 'redux';
import { Anim } from '../../model/Schema';

export const SELECTVIDEOLIST = 'SELECTVIDEOLIST';
export const ADDFILESTOLIST = 'ADDFILESTOLIST';
export const DELETEFROMLIST = 'DELETEFROMLIST';

export interface SelectVideoAction extends Action {
  type: 'SELECTVIDEOLIST';
  payload: string;
}

export interface AddFileAction extends Action {
  type: 'ADDFILESTOLIST';
  payload: Anim[];
}
export interface DeleteFileAction extends Action {
  type: 'DELETEFROMLIST';
}

export const selectAnim: ActionCreator<SelectVideoAction> = payload => ({
  payload,
  type: SELECTVIDEOLIST
});
export const addFiles: ActionCreator<AddFileAction> = payload => ({
  payload,
  type: ADDFILESTOLIST
});
export const deleteFile: ActionCreator<DeleteFileAction> = payload => ({
  payload,
  type: DELETEFROMLIST
});

export type ListAction = SelectVideoAction | AddFileAction | DeleteFileAction;

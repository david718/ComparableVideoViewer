import { Action, ActionCreator } from 'redux';
import { Anim } from '../../model/Schema';

export const SELECTANIM = 'SELECTANIM';
export const ADDFILESTOLIST = 'ADDFILESTOLIST';
export const DELETEFROMLIST = 'DELETEFROMLIST';
export const CHANGEBARPOSITION = 'CHANGEBARPOSITION';
export const CHANGEVIEWPOINT = 'CHANGEVIEWPOINT';

export interface SelectVideoAction extends Action {
  type: 'SELECTANIM';
  payload: string;
}
export interface AddFileAction extends Action {
  type: 'ADDFILESTOLIST';
  payload: Anim[];
}
export interface DeleteFileAction extends Action {
  type: 'DELETEFROMLIST';
  payload: string;
}
export interface ChangeBarAction extends Action {
  type: 'CHANGEBARPOSITION';
  payload: number;
}
export interface ChangeViewAction extends Action {
  type: 'CHANGEVIEWPOINT';
}

export const selectAnim: ActionCreator<SelectVideoAction> = payload => ({
  payload,
  type: SELECTANIM
});
export const addFiles: ActionCreator<AddFileAction> = payload => ({
  payload,
  type: ADDFILESTOLIST
});
export const deleteAnim: ActionCreator<DeleteFileAction> = payload => ({
  payload,
  type: DELETEFROMLIST
});
export const changeBarPostion: ActionCreator<ChangeBarAction> = payload => ({
  payload,
  type: CHANGEBARPOSITION
});
export const changeViewPoint: ActionCreator<ChangeViewAction> = () => ({
  type: CHANGEVIEWPOINT
});

export type ListAction =
  | SelectVideoAction
  | AddFileAction
  | DeleteFileAction
  | ChangeBarAction
  | ChangeViewAction;

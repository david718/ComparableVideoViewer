import { Action, ActionCreator } from 'redux';

export const CHANGEIMAGE = 'CHANGEIMAGE';

export interface ChangeImageAction extends Action {
  type: 'CHANGEIMAGE';
  payload: string;
}

export const changeImage: ActionCreator<ChangeImageAction> = payload => ({
  payload,
  type: CHANGEIMAGE
});

export type ViewAction = ChangeImageAction;

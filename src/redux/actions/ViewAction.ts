import { Action, ActionCreator } from 'redux';

export const CHANGEBARPOSITION = 'CHANGEBARPOSITION';

export interface ChangeBarAction extends Action {
  type: 'CHANGEBARPOSITION';
  payload: number;
}

export const changeBarPosition: ActionCreator<ChangeBarAction> = payload => ({
  payload,
  type: CHANGEBARPOSITION
});

export type ViewAction = ChangeBarAction;

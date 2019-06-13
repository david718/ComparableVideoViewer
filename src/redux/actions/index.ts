import { CounterAction } from './counterActions';
import { ListAction } from './ListAction';
import { ViewAction } from './viewAction';

export type RootActions =
  | CounterAction[keyof CounterAction]
  | ListAction[keyof ListAction]
  | ViewAction[keyof ViewAction];

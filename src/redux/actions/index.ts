import { ListAction } from './ListAction';
import { ViewAction } from './viewAction';

export type RootActions = ListAction[keyof ListAction] | ViewAction[keyof ViewAction];

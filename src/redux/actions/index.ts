import { ListAction } from './ListAction';
import { ViewAction } from './ViewAction';

export type RootActions = ListAction[keyof ListAction] | ViewAction[keyof ViewAction];

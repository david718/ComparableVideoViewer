import { App } from 'electron';
import { LowdbSync } from 'lowdb';
import Schema from '../model/Schema';

type AnyApp = App & {
  db: LowdbSync<Schema>;
};

export default AnyApp;

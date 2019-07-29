import { App } from 'electron';
import { LowdbSync } from 'lowdb';
import Schema from '../model/Schema';
// import { ExecaStatic } from 'execa';

type AnyApp = App & {
  db: LowdbSync<Schema>;
  // execa: ExecaStatic;
};

export default AnyApp;

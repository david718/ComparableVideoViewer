import * as path from 'path';
import { app } from 'electron';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

import Schema from '../model/Schema';

const userDataPath: string = app.getPath('userData');
const dbPath: string = path.join(userDataPath, 'db.json');

const adapter = new FileSync<Schema>(dbPath, {
  defaultValue: {
    anims: [],
    selectAnimId: '',
    barX: 0
  }
});

const db = lowdb(adapter);

export default db;

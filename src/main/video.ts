import { remote } from 'electron';
import * as _ from 'lodash';
import { generate } from 'shortid';
const ffprobe = remote.require('ffprobe');
const ffprobeStatic = remote.require('ffprobe-static');

import { Info, Anim } from '../model/Schema';

const createVideoInfo = (item: string): Promise<Anim> =>
  new Promise(async (resolve, reject) => {
    try {
      const info: Info = await ffprobe(item, { path: ffprobeStatic.path });
      resolve({ info, id: generate(), path: item });
    } catch (err) {
      reject(err);
    }
  });

const createVideoInfoList = (videoPaths: string[]): Promise<Anim[]> =>
  Promise.all<Anim>(_.map(videoPaths, createVideoInfo));

const videoSelector = (): Promise<Anim[]> =>
  new Promise(async (resolve, reject) => {
    try {
      const filePaths = await remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
        filters: [
          {
            name: 'Videos',
            extensions: ['mp4', 'mpeg', 'avi']
          }
        ],
        properties: [
          // 'openFile',
          // 'openDirectory',
          'multiSelections'
        ]
      });

      if (!filePaths || _.isEmpty(filePaths)) {
        reject(new Error('Empty File'));
      } else {
        const anims: Anim[] = await createVideoInfoList(filePaths);
        resolve(anims);
      }
    } catch (err) {
      reject(err);
    }
  });

export { videoSelector, createVideoInfo };

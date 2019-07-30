import { remote } from 'electron';
import * as _ from 'lodash';
import { Info } from '../model/Schema';
import { generate } from 'shortid';

export interface ResultData {
  id: string;
  path: string;
  info: Info;
}

const ffprobe = remote.require('ffprobe');
const ffprobeStatic = remote.require('ffprobe-static');

const createVideoInfo = (item: string) =>
  new Promise<ResultData>((resolve, reject) =>
    ffprobe(item, { path: ffprobeStatic.path }, (err: Error, info: Info): void => {
      if (err) {
        reject(err);
      } else {
        resolve({ info, id: generate(), path: item });
      }
    })
  );

const createVideoInfoList = (videoPaths: string[]): Promise<ResultData[]> =>
  Promise.all<ResultData>(_.map(videoPaths, createVideoInfo));

const videoSelector = (): Promise<ResultData[]> =>
  new Promise((resolve, reject): void => {
    console.log('videoSelector');
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
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
      },
      async filePaths => {
        console.log(filePaths);
        if (!filePaths || _.isEmpty(filePaths)) {
          reject(new Error('Empty File'));
        } else {
          createVideoInfoList(filePaths).then((result: ResultData[]) => {
            resolve(result);
            console.log(result);
          });
        }
      }
    );
  });

export { videoSelector, createVideoInfo };

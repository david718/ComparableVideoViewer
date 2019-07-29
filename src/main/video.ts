import { remote } from 'electron';
import * as _ from 'lodash';
import { Metadata } from '../model/Schema';

export interface ResultData {
  path: string;
  metadata: Metadata;
}

const gm = remote.require('gm');

const createVideoInfo = (item: string) =>
  new Promise<ResultData>((resolve, reject) =>
    gm(item).identify((err: Error, metadata: Metadata): void => {
      if (err) {
        reject(err);
      } else {
        resolve({ metadata, path: item });
      }
    })
  );

const createVideoInfoList = (videoPaths: string[]): Promise<ResultData[]> =>
  Promise.all<ResultData>(_.map(videoPaths, createVideoInfo));

const videoSelector = (): Promise<ResultData[]> =>
  new Promise((resolve, reject): void => {
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        filters: [
          {
            name: 'Videos',
            extensions: ['mp4']
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

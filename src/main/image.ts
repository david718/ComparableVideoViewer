import { remote } from 'electron';
import * as _ from 'lodash';
import { Metadata } from '../model/Schema';

export interface ResultData {
  path: string;
  metadata: Metadata;
}

const gm = remote.require('gm');

const getMetadata = async (imagePath: string): Promise<Metadata> =>
  new Promise<Metadata>(
    (resolve, reject): void => {
      gm(imagePath).identify(
        (err: Error, imageInfo: Metadata): void => {
          if (err) {
            reject(err);
          } else {
            resolve(imageInfo || 'Resolution Undefined');
          }
        }
      );
    }
  );

const imageSelector = (): Promise<ResultData> =>
  new Promise(
    (resolve, reject): void => {
      remote.dialog.showOpenDialog(
        remote.getCurrentWindow(),
        {
          filters: [
            {
              name: 'Images',
              extensions: ['jpg', 'jpeg', 'png']
            }
          ]
        },
        filePaths => {
          console.log(filePaths);
          if (!filePaths || _.isEmpty(filePaths)) {
            reject(new Error('Empty File'));
          } else {
            getMetadata(filePaths[0]).then((metadata: Metadata) => {
              const resultData = { metadata, path: `file://${filePaths[0]}` };
              resolve(resultData);
            });
          }
        }
      );
    }
  );

export { imageSelector };

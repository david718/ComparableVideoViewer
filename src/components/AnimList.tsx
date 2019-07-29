import * as React from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
import * as shortid from 'shortid';
import * as _ from 'lodash';
import * as path from 'path';

import { ListAction, addFiles } from '../redux/actions/ListAction';
import { SampleVideo, Processor, ProcessorInfo } from '../model/Schema';
import AnyApp from '../main/AnyApp';

const { db } = remote.app as AnyApp;

import AnimListItem from './AnimListItem';
import { videoSelector, ResultData, createVideoInfo } from '../main/video';

interface Props {
  anims: string[];
  addFilesToList: (payload: SampleVideo) => any;
}

const AnimList: React.SFC<Props> = ({ anims, addFilesToList }) => {
  const AnimTagList = anims.map((name, i) => <AnimListItem key={i + name} name={name} />);

  // const runProcessor = async (payload: SampleVideo, videoDirPath: string, processor: Processor) => {
  //   const input = payload.path;
  //   const output = `${videoDirPath}/${payload.id}_${processor.id}.mp4`;
  //   const run = processor.run.replace('@INPUT', input).replace('@OUTPUT', output);
  //   console.log(run);
  //   await execa.shell(run);

  //   const processorResultData = await createVideoInfo(output);
  //   const newProcessorInfo: ProcessorInfo = {
  //     id: processor.id,
  //     name: processor.name,
  //     status: 'processed',
  //     resultPath: processorResultData.path,
  //     metadata: processorResultData.metadata
  //   };

  //   return newProcessorInfo;
  // };

  // const runProcessorsFromDb = async (payload: SampleVideo, videoDirPath: string) => {
  //   const processors = db.get('processors').value();

  //   await Promise.all<void>(
  //     _.map(processors, async item => {
  //       const newProcessorsInfo = await runProcessor(payload, videoDirPath, item);
  //       console.log(newProcessorsInfo);
  //       if (payload.processors) {
  //         payload.processors = _.concat(payload.processors, newProcessorsInfo);
  //       } else {
  //         payload.processors = [newProcessorsInfo];
  //       }
  //     })
  //   );

  //   console.log(`runProcessorsFromDb ${payload.processors}`);

  //   return payload;
  // };

  // const createVideoDir = async (payload: SampleVideo) => {
  //   const videoDirPath = path.join(db.get('videoPath').value(), payload.id);
  //   const mkdirCommand = `mkdir -p ${videoDirPath}`;
  //   console.log(mkdirCommand);
  //   await execa.shell(mkdirCommand).then(() => {
  //     console.log(payload);
  //   });
  //   return { payload, videoDirPath };
  // };

  const setSampleVideo = (item: ResultData) => {
    const payload: SampleVideo = {
      id: shortid(),
      path: item.path,
      metadata: item.metadata,
      processors: undefined
    };

    return payload;
  };

  // const copySampleVideo = async (payload: SampleVideo, videoDirPath: string) => {
  //   const newPath = `${videoDirPath}/${payload.id}.mp4`;
  //   const copyCommand = `convert ${payload.path} ${newPath}`;
  //   console.log(copyCommand);
  //   await execa.shell(copyCommand);

  //   payload.path = newPath;
  //   return { payload, videoDirPath };
  // };

  // const createSampleVideo = async (item: ResultData) => {
  //   const payload = setSampleVideo(item);

  //   createVideoDir(payload)
  //     .then(({ payload, videoDirPath }) => {
  //       return copySampleVideo(payload, videoDirPath);
  //     })
  //     .then(({ payload, videoDirPath }) => {
  //       return runProcessorsFromDb(payload, videoDirPath);
  //     })
  //     .then(payload => {
  //       db.get('sampleVideos')
  //         .push(payload)
  //         .write();
  //       addFilesToList(payload);
  //     });
  // };

  const selectFiles = async (): Promise<void> => {
    videoSelector()
      .then((data): void => {
        console.log(data);
        Promise.all<void>(
          _.map(data, item => {
            console.log('!!');
            // createSampleVideo(item);
          })
        );
      })
      .catch((err): void => {
        console.error(err);
      });
  };

  const handleClick = () => selectFiles();

  return (
    <div>
      <div>애니메이션 목록</div>
      <button onClick={handleClick}>Add+</button>
      {AnimTagList}
    </div>
  );
};

const mapDispatchToProps = (dispatch: React.Dispatch<ListAction>) => ({
  addFilesToList: (payload: SampleVideo) => dispatch(addFiles(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(AnimList);

import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { ListAction, addFiles } from '../redux/actions/ListAction';
import { SampleVideo } from '../model/Schema';

import AnimListItem from './AnimListItem';
import { videoSelector } from '../main/video';

interface Props {
  anims: string[];
  addFilesToList: (payload: SampleVideo) => any;
}

const AnimList: React.SFC<Props> = ({ anims, addFilesToList }) => {
  const AnimTagList = anims.map((name, i) => <AnimListItem key={i + name} name={name} />);

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

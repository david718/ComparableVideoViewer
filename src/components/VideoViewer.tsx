import * as React from 'react';
import { connect } from 'react-redux';
import * as path from 'path';

import ComparableVideoViewer from './ComparableVideoViewer';
import { RootState } from '../redux/reducers';
import { Anim } from '../model/Schema';
import { STitle, SAnimTitle } from '../styled';

interface Props {
  anims: Anim[];
  selectedAnimId: string;
}

const VideoViewer: React.SFC<Props> = ({ anims, selectedAnimId }) => {
  let selectedPath = '영상을 선택해주세요';

  anims.forEach(anim => {
    if (anim.id === selectedAnimId) selectedPath = anim.path;
  });

  const animName = path.basename(selectedPath).split('.')[0];

  return (
    <div>
      <STitle>Screen</STitle>
      <SAnimTitle>{animName}</SAnimTitle>
      <ComparableVideoViewer src={`file://${selectedPath}`} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    anims: state.list.anims,
    selectedAnimId: state.list.selectedAnimId
  };
};

export default connect(
  mapStateToProps,
  null
)(VideoViewer);

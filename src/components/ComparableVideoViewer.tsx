import * as React from 'react';
import { Player } from 'video-react';
import * as path from 'path';

import { RootState } from '../redux/reducers';
import { connect } from 'react-redux';
import { Anim } from '../model/Schema';

interface Props {
  anims: Anim[];
  selectedAnimId: string;
}

const ComparableVideoViewer: React.SFC<Props> = ({ anims, selectedAnimId }) => {
  let selectedPath = '영상을 선택해주세요';
  anims.forEach(anim => {
    if (anim.id === selectedAnimId) selectedPath = anim.path;
  });

  const animName = path.basename(selectedPath).split('.')[0];
  return (
    <div>
      <div>{animName}</div>
      <Player key={`file://${selectedPath}`}>
        <source src={`file://${selectedPath}`} />
      </Player>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { anims: state.list.anims, selectedAnimId: state.list.selectedAnimId };
};

export default connect(
  mapStateToProps,
  null
)(ComparableVideoViewer);

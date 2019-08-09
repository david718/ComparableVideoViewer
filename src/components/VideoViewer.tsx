import * as React from 'react';
import { connect } from 'react-redux';
import * as path from 'path';
import styled from 'styled-components';

import ComparableVideoViewer from './ComparableVideoViewer';
import { RootState } from '../redux/reducers';
import { Anim } from '../model/Schema';

interface Props {
  anims: Anim[];
  selectedAnimId: string;
}

const STitle = styled.div`
  margin: 10px;

  color: #ff8702;
  font-size: 24px;
`;

const SAnimTitle = styled.div`
  margin: 10px;

  font-size: 16px;
`;

const Remove = styled.span`
  float: right;
  margin: 10px;

  color: #ff8702;
  font-size: 24px;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;

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

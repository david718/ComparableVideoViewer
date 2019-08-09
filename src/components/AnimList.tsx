import * as React from 'react';
import { connect } from 'react-redux';
import * as path from 'path';
import * as _ from 'lodash';
import styled from 'styled-components';

import { ListAction, addFiles } from '../redux/actions/ListAction';
import { RootState } from '../redux/reducers';
import { videoSelector } from '../main/video';
import { Anim } from '../model/Schema';
import AnimListItem from './AnimListItem';

interface Props {
  anims: Anim[];
  addFilesToList: (payload: Anim[]) => any;
}

const SAnimList = styled.div`
  margin: 10px;
`;

const STitle = styled.div`
  margin: 10px;

  color: #ff8702;
  font-size: 24px;
`;

const SButtonImg = styled.img`
  vertical-align: middle;
  width: 28px;
  margin-right: 10px;
`;

const SButton = styled.button`
  width: 150px;
  height: 40px;
  margin: 10px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #ff8702;
  color: white;
  font-size: 16px;
  :hover {
    cursor: pointer;
  }
`;

const AnimList: React.SFC<Props> = ({ anims, addFilesToList }) => {
  const AnimTagList = anims.map(anim => (
    <AnimListItem key={anim.id} id={anim.id} name={path.basename(anim.path.split('.')[0])} />
  ));

  const getAnimsFromLocal = async (): Promise<void> => {
    try {
      const localAnims = await videoSelector();
      addFilesToList(localAnims);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SAnimList>
      <STitle>Animation List</STitle>
      <SButton onClick={getAnimsFromLocal}>
        <SButtonImg src="https://hsr.hodooai.com/afece89d83a535935c4d0fd0253aab30.png" />
        Choose File
      </SButton>
      {AnimTagList}
    </SAnimList>
  );
};

const mapDispatchToProps = (dispatch: React.Dispatch<ListAction>) => ({
  addFilesToList: (payload: Anim[]) => dispatch(addFiles(payload))
});

const mapStateToProps = (state: RootState) => {
  return {
    anims: state.list.anims
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimList);

import * as React from 'react';
import { connect } from 'react-redux';
import * as path from 'path';
import * as _ from 'lodash';

import { ListAction, addFiles } from '../redux/actions/ListAction';
import { RootState } from '../redux/reducers';
import { videoSelector } from '../main/video';
import { Anim } from '../model/Schema';
import AnimListItem from './AnimListItem';
import { SAnimList, STitle, SButtonImg, SButton } from '../styled';

interface Props {
  anims: Anim[];
  addFilesToList: (payload: Anim[]) => any;
}

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
      <SButton onClick={getAnimsFromLocal} width={160}>
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

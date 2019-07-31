import * as React from 'react';
import { connect } from 'react-redux';
import * as path from 'path';
import * as _ from 'lodash';

import { ListAction, addFiles } from '../redux/actions/ListAction';
import { RootState } from '../redux/reducers';
import { videoSelector } from '../main/video';
import { Anim } from '../model/Schema';
import AnimListItem from './AnimListItem';

interface Props {
  anims: Anim[];
  addFilesToList: (payload: Anim[]) => any;
}

const AnimList: React.SFC<Props> = ({ anims, addFilesToList }) => {
  const AnimTagList = anims.map(anim => {
    return <AnimListItem key={anim.id} id={anim.id} name={path.basename(anim.path)} />;
  });

  const getAnimsFromLocal = async (): Promise<void> => {
    videoSelector()
      .then((data): void => {
        addFilesToList(data);
      })
      .catch((err): void => {
        console.error(err);
      });
  };

  return (
    <div>
      <div>애니메이션 목록</div>
      <button onClick={getAnimsFromLocal}>Add+</button>
      {AnimTagList}
    </div>
  );
};

const mapDispatchToProps = (dispatch: React.Dispatch<ListAction>) => ({
  addFilesToList: (payload: Anim[]) => dispatch(addFiles(payload))
});

const mapStateToProps = (state: RootState) => {
  console.log(state);
  return {
    anims: state.list.anims
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimList);

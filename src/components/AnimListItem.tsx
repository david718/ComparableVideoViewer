import * as React from 'react';
import { connect } from 'react-redux';

import { ListAction, selectAnim, deleteAnim } from '../redux/actions/ListAction';
import { RootState } from '../redux/reducers';
import { SAnimItem, SRemove } from '../styled';

interface Props {
  id: string;
  name: string;
  selectedId: string;
  changedSelectedAnimId: (payload: string) => any;
  deleteAnim: (payload: string) => any;
}

const AnimListItem: React.SFC<Props> = ({
  id,
  name,
  selectedId,
  changedSelectedAnimId,
  deleteAnim
}) => {
  const selectAnim = () => {
    if (id !== selectedId) {
      changedSelectedAnimId(id);
    }
  };
  const deleteAnimByClick = (e: any) => {
    e.stopPropagation();
    deleteAnim(id);
  };

  return (
    <SAnimItem onClick={selectAnim} defaultChecked={id === selectedId}>
      <span>{name}</span>
      <SRemove className="remove" onClick={deleteAnimByClick}>
        X
      </SRemove>
    </SAnimItem>
  );
};

const mapDispatchToProps = (dispatch: React.Dispatch<ListAction>) => ({
  changedSelectedAnimId: (payload: string) => dispatch(selectAnim(payload)),
  deleteAnim: (payload: string) => dispatch(deleteAnim(payload))
});

const mapStateToProps = (state: RootState) => {
  return {
    selectedId: state.list.selectedAnimId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimListItem);

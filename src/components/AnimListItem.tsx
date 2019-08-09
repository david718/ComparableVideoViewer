import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ListAction, selectAnim, deleteAnim } from '../redux/actions/ListAction';
import { RootState } from '../redux/reducers';

interface Props {
  id: string;
  name: string;
  selectedId: string;
  changedSelectedAnimId: (payload: string) => any;
  deleteAnim: (payload: string) => any;
}

const SAnimItem = styled.div`
  margin: 10px;
  padding: 10px;

  border: 2px solid transparent;
  border-radius: 4px;
  border-color: white;
  background-color: ${props => (props.defaultChecked ? 'gainsboro' : 'white')};
  font-size: 16px;
  :hover {
    border: 2px solid;
    border-color: gainsboro;
    cursor: default;
  }
  :hover .remove {
    opacity: 1;
  }
`;

const Remove = styled.span`
  float: right;

  font-weight: bold;
  color: #e64980;
  opacity: 0;
  :hover {
    cursor: pointer;
  }
`;

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
      <Remove className="remove" onClick={deleteAnimByClick}>
        X
      </Remove>
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

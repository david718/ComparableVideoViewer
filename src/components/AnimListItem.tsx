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

const RAnimItem = styled.div`
  background-color: ${props => (props.defaultChecked ? 'gainsboro' : 'white')};
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  position: relative;
  :hover {
    border: solid;
    border-radius: 3;
    border-color: gainsboro;
  }
  :hover .remove {
    opacity: 1;
  }
`;

const Remove = styled.span`
  position: absolute;
  right: 10px;
  font-size: 25px;
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
    console.log('delete');
    deleteAnim(id);
  };

  return (
    <RAnimItem onClick={selectAnim} defaultChecked={id === selectedId}>
      <span>{name}</span>
      <Remove className="remove" onClick={deleteAnimByClick}>
        x
      </Remove>
    </RAnimItem>
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

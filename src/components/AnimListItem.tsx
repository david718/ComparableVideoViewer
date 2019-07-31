import * as React from 'react';
import { connect } from 'react-redux';
import styledComponents from 'styled-components';

import { ListAction, selectAnim } from '../redux/actions/ListAction';
import { RootState } from '../redux/reducers';

interface Props {
  id: string;
  name: string;
  selectedId: string;
  changedSelectedAnimId: (payload: string) => any;
}

const RAnimItem = styled.div`
  background-color: ${props => (props.defaultChecked ? 'gainsboro' : 'white')};
  :hover {
    border: solid;
    border-radius: 3;
    border-color: gainsboro;
  }
  :hover .Remove {
    opacity: 1;
  }
`;

const AnimListItem: React.SFC<Props> = ({ id, name, selectedId, changedSelectedAnimId }) => {
  const handleClick = () => changedSelectedAnimId(id);
  return (
    <RAnimItem onClick={handleClick} defaultChecked={id === selectedId}>
      <div>{name}</div>
    </RAnimItem>
  );
};

const mapDispatchToProps = (dispatch: React.Dispatch<ListAction>) => ({
  changedSelectedAnimId: (payload: string) => dispatch(selectAnim(payload))
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

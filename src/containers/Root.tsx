import * as React from 'react';
import * as _ from 'lodash';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';

import Header from '../components/Header';
import VideoViewer from '../components/VideoViewer';
import AnimList from '../components/AnimList';
import './Root.scss';

interface Props {}

interface States {}

const SRoot = styled.div`
  font-family: Oswald, sans-serif;
`;

class Root extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SRoot>
        <Header />
        <SplitPane split="vertical" minSize={300} defaultSize={300}>
          <AnimList />
          <VideoViewer />
        </SplitPane>
      </SRoot>
    );
  }
}

export default Root;

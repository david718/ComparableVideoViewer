import * as React from 'react';
import * as _ from 'lodash';
import SplitPane from 'react-split-pane';

import Header from '../components/Header';
import ComparableVideoViewer from '../components/ComparableVideoViewer';
import AnimList from '../components/AnimList';
import './Root.scss';

interface Props {}

interface States {}

class Root extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />
        <SplitPane split="vertical" minSize={250} defaultSize={250}>
          <AnimList />
          <ComparableVideoViewer />
        </SplitPane>
      </>
    );
  }
}

export default Root;

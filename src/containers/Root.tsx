import * as React from 'react';
import * as _ from 'lodash';
import SplitPane from 'react-split-pane';

import Header from '../components/Header';
import ComparableVideoViewer from '../components/ComparableVideoViewer';
import AnimList from '../components/AnimList';
import WebCam from '../components/WebCam';
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
        <SplitPane split="vertical" minSize={150} defaultSize={150}>
          <AnimList anims={['알라딘', '라이온킹']} />
          <ComparableVideoViewer />
        </SplitPane>
      </>
    );
  }
}

export default Root;

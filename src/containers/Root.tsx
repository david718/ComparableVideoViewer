import * as React from 'react';
import * as _ from 'lodash';

import WebCam from '../components/WebCam';
import './Root.scss';

interface Props {}

interface States {}

class Root extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <WebCam />;
  }
}

export default Root;

import * as React from 'react';
import { Player } from 'video-react';

const ComparableVideoViewer = () => {
  return (
    <div>
      <div>
        <Player>
          <source src={'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'} />
        </Player>
      </div>
    </div>
  );
};

export default ComparableVideoViewer;

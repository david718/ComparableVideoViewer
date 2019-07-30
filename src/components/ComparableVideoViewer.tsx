import * as React from 'react';
import { Player } from 'video-react';

const ComparableVideoViewer = () => {
  return (
    <div>
      <div>
        <Player>
          <source src={'file:///home/hwanggyeongchan/Downloads/sampleVideo.mp4'} />
        </Player>
      </div>
    </div>
  );
};

export default ComparableVideoViewer;

import * as React from 'react';
import * as _ from 'lodash';

interface Props {
  src: string;
}

const VideoViewerByCanvas: React.SFC<Props> = ({ src }) => {
  const videoRef: React.RefObject<HTMLVideoElement> = React.useRef(null);
  const canvasRef: React.RefObject<HTMLCanvasElement> = React.useRef(null);

  const video = videoRef.current;
  const canvas = canvasRef.current;

  const context = React.useRef(null);
  let ctx: CanvasRenderingContext2D | null = context.current;

  function capture() {
    if (canvas && video) {
      ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth / 2;
      canvas.height = video.videoHeight;
      if (ctx) {
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        canvas.toBlob((blob: any) => {
          const img = new Image();
          img.src = window.URL.createObjectURL(blob);
        });
      }
    }
  }

  if (video && canvas) {
    ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth / 2;
    canvas.height = video.videoHeight;

    if (ctx) {
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }
  }

  return (
    <div>
      <video ref={videoRef} src={src} controls={true} />
      <div>
        <canvas ref={canvasRef}/>
      </div>
    </div>
  );
};

export default VideoViewerByCanvas;

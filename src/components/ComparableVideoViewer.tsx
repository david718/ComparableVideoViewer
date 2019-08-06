import * as React from 'react';

interface Props {
  src: string;
}

const ComparableVideoViewer: React.SFC<Props> = ({ src }) => {
  const videoRef: React.RefObject<HTMLVideoElement> = React.useRef(null);
  const video = videoRef.current;

  const canvasRef: React.RefObject<HTMLCanvasElement> = React.useRef(null);

  const twoVideosToCanvasWithBar = (video: any, canvas: any, width: number) => {
    const backgroundVideoConfig = {
      video,
      sourceX: video.videoWidth / 2 + width,
      sourceY: 0,
      sourceWidth: video.videoWidth / 2 - width,
      sourceHeight: video.videoHeight,
      drawX: width,
      drawY: 0,
      drawWidth: video.videoWidth / 2 - width,
      drawHeight: video.videoHeight
    };
    const overrideVideoConfig = {
      video,
      sourceX: 0,
      sourceY: 0,
      sourceWidth: width,
      sourceHeight: video.videoHeight,
      drawX: 0,
      drawY: 0,
      drawWidth: width,
      drawHeight: video.videoHeight
    };
    if (canvas) {
      canvas.width = video.videoWidth / 2;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.drawImage(...Object.values(backgroundVideoConfig));

      ctx.beginPath();
      ctx.drawImage(...Object.values(overrideVideoConfig));

      const barWidth = 10;
      const barConfig = {
        drawX: video.videoWidth / 2 - barWidth,
        drawY: 0,
        drawWidth: barWidth,
        drawHeight: video.videoHeight
      };

      ctx.beginPath();
      if (width > video.videoWidth / 2 - barWidth) {
        ctx.rect(...Object.values(barConfig));
        ctx.fill();
      } else {
        ctx.rect(width, 0, 10, video.videoHeight);
        ctx.fill();
      }
    }
  };
  const interval = setInterval(() => {
    if (video) {
      twoVideosToCanvasWithBar(video, canvasRef.current, video.videoWidth / 4);
    }
  });
  React.useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  const startAnim = () => {
    if (video) {
      video.play();
    }
  };

  const pauseAnim = () => {
    if (video) {
      video.pause();
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <video style={{ display: 'none' }} ref={videoRef} src={src} controls={true} />
      <div>
        <button onClick={startAnim}>시작</button>
        <button onClick={pauseAnim}>멈춤</button>
      </div>
    </div>
  );
};

export default ComparableVideoViewer;

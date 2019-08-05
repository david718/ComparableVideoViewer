import * as React from 'react';

interface Props {
  src: string;
}

const ComparableVideoViewer: React.SFC<Props> = ({ src }) => {
  const videoRef: React.RefObject<HTMLVideoElement> = React.useRef(null);
  const video = videoRef.current;

  const canvasRef: React.RefObject<HTMLCanvasElement> = React.useRef(null);
  const highCanvasRef: React.RefObject<HTMLCanvasElement> = React.useRef(null);

  const interval = setInterval(() => {
    if (video) {
      const videoToCanvas = (video: any, canvas: any, position: any, width: any) => {
        if (canvas) {
          canvas.width = video.videoWidth / 2;
          canvas.height = video.videoHeight;

          canvas
            .getContext('2d')
            .drawImage(
              video,
              position === 'left' ? 0 : video.videoWidth / 2,
              0,
              width,
              video.videoHeight,
              0,
              0,
              width,
              video.videoHeight
            );
        }
      };
      videoToCanvas(video, canvasRef.current, 'left', video.videoWidth / 4);
      videoToCanvas(video, highCanvasRef.current, 'right', video.videoWidth / 2);
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
    <div style={{ position: 'relative' }}>
      <canvas style={{ position: 'absolute', top: 0, left: 0 }} ref={highCanvasRef}/>
      <canvas style={{ position: 'absolute', top: 0, left: 0 }} ref={canvasRef} />

      <video style={{ display: 'none' }} ref={videoRef} src={src} controls={true} />
      <div
        style={{ position: 'absolute', top: video ? video.videoHeight : 360, left: 0, padding: 10 }}
      >
        <button onClick={startAnim}>시작</button>
        <button onClick={pauseAnim}>멈춤</button>
      </div>
    </div>
  );
};

export default ComparableVideoViewer;

import * as React from 'react';
interface Props {
  src: string;
}

const ComparableVideoViewer: React.SFC<Props> = ({ src }) => {
  const videoRef: React.RefObject<HTMLVideoElement> = React.useRef(null);
  const video = videoRef.current;

  const canvasRef: React.RefObject<HTMLCanvasElement> = React.useRef(null);

  // videoWidth - barWidth 가 barX 의 초기값
  const [barX, setBarX] = React.useState(160 - 10);

  const devineVideoToCanvasWithBar = (video: any, canvas: any, width: number) => {
    if (canvas) {
      canvas.width = video.videoWidth / 2;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      const barWidth = 10;

      let dragabble: boolean = false;

      let y: number = 0;
      const canvasX = canvas.getBoundingClientRect().left;
      const canvasY = canvas.getBoundingClientRect().top;

      const drawBar = (x: number, y: number, w: number, h: number, style: string) => {
        ctx.fillStyle = style;
        ctx.rect(x, y, w, h);
        ctx.fill();
      };

      const myMove = (e: any) => {
        if (dragabble) {
          setBarX(e.pageX - canvasX);
          y = e.pageY - canvasY;
        }
      };
      const myDown = (e: any) => {
        if (barX < e.pageX - canvasX && e.pageX - canvasX < barX + barWidth) {
          console.log('click');
          setBarX(e.pageX - canvasX);
          y = e.pageY - canvasY;
          dragabble = true;
          canvas.onmousemove = myMove;
        }
      };
      const myUp = () => {
        dragabble = false;
        canvas.onmousemove = null;
      };

      ctx.clearRect(0, 0, video.videoWidth / 2, video.videoHeight);

      ctx.beginPath();
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
      ctx.drawImage(...Object.values(backgroundVideoConfig));

      ctx.beginPath();
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
      ctx.drawImage(...Object.values(overrideVideoConfig));

      ctx.beginPath();
      drawBar(barX, y, barWidth, video.videoHeight, '#444444');

      canvas.onmousedown = myDown;
      canvas.onmouseup = myUp;
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (video) {
        devineVideoToCanvasWithBar(video, canvasRef.current, video.videoWidth / 4);
      }
    });
    return () => clearInterval(interval);
  }, [video, barX]);

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

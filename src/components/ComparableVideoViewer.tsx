import * as React from 'react';
import { connect } from 'react-redux';

import { ListAction, changeBarPostion } from '../redux/actions/ListAction';
import { RootState } from '../redux/reducers';

interface Props {
  src: string;
  barX: number;
  setBarX: (payload: number) => any;
}

const ComparableVideoViewer: React.SFC<Props> = ({ src, barX, setBarX }) => {
  const videoRef: React.RefObject<HTMLVideoElement> = React.useRef(null);
  const video = videoRef.current;

  const canvasRef: React.RefObject<HTMLCanvasElement> = React.useRef(null);

  // videoWidth - barWidth 가 barX 의 초기값

  const devineVideoToCanvasWithBar = (video: any, canvas: any, width: number) => {
    if (canvas) {
      canvas.width = video.videoWidth / 2;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      const canvasX = canvas.getBoundingClientRect().left;

      let dragabble: boolean = false;
      const barWidth = 10;

      const barMove = (e: any) => {
        if (dragabble) {
          setBarX(e.pageX - canvasX);
        }
      };
      const mouseDown = (e: any) => {
        if (width < e.pageX - canvasX && e.pageX - canvasX < width + barWidth) {
          setBarX(e.pageX - canvasX - barWidth / 2);
          dragabble = true;
          canvas.onmousemove = barMove;
        }
      };
      const mouseUp = (e: any) => {
        dragabble = false;
        canvas.onmousemove = null;
        if (e.pageX - canvasX >= canvas.width - barWidth) {
          setBarX(canvas.width - barWidth);
        } else if (e.pageX - canvasX <= 0) {
          setBarX(0);
        }
      };
      const drawBar = (x: number, y: number, w: number, h: number, style: string) => {
        ctx.fillStyle = style;
        ctx.rect(x, y, w, h);
        ctx.fill();
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
      drawBar(width, 0, barWidth, video.videoHeight, '#444444');

      canvas.onmousedown = mouseDown;
      canvas.onmouseup = mouseUp;
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (video) {
        devineVideoToCanvasWithBar(video, canvasRef.current, barX);
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

const mapDispatchToProps = (dispatch: React.Dispatch<ListAction>) => ({
  setBarX: (payload: number) => dispatch(changeBarPostion(payload))
});

const mapStateToProps = (state: RootState) => {
  return {
    barX: state.list.barX
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComparableVideoViewer);

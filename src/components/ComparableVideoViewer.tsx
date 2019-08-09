import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ListAction, changeBarPostion } from '../redux/actions/ListAction';
import { RootState } from '../redux/reducers';

interface Props {
  src: string;
  barX: number;
  setBarX: (payload: number) => any;
}

const SButton = styled.button`
  width: 80px;
  height: 40px;
  margin: 10px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #ff8702;
  color: white;
  font-size: 16px;
  :hover {
    cursor: pointer;
  }
`;

const SComparableVideoViewer = styled.div`
  background-image: url('https://hsr.hodooai.com/5dcc6881b85f662376bf08b591a186bd.png');
  background-size: cover;
`;

const ComparableVideoViewer: React.SFC<Props> = ({ src, barX, setBarX }) => {
  const videoRef: React.RefObject<HTMLVideoElement> = React.useRef(null);
  const video = videoRef.current;

  const canvasRef: React.RefObject<HTMLCanvasElement> = React.useRef(null);

  const devineVideoToCanvasWithBar = (video: any, canvas: any, barX: number) => {
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
        if (barX < e.pageX - canvasX && e.pageX - canvasX < barX + barWidth) {
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
        sourceX: video.videoWidth / 2 + barX,
        sourceY: 0,
        sourceWidth: video.videoWidth / 2 - barX,
        sourceHeight: video.videoHeight,
        drawX: barX,
        drawY: 0,
        drawWidth: video.videoWidth / 2 - barX,
        drawHeight: video.videoHeight
      };
      ctx.drawImage(...Object.values(backgroundVideoConfig));

      ctx.beginPath();
      const overrideVideoConfig = {
        video,
        sourceX: 0,
        sourceY: 0,
        sourceWidth: barX,
        sourceHeight: video.videoHeight,
        drawX: 0,
        drawY: 0,
        drawWidth: barX,
        drawHeight: video.videoHeight
      };
      ctx.drawImage(...Object.values(overrideVideoConfig));

      ctx.beginPath();
      drawBar(barX, 0, barWidth, video.videoHeight, '#444444');

      const drawText = (
        size: number,
        family: string,
        color: string,
        src: string,
        textX: number
      ) => {
        ctx.font = `${size.toString()}px ${family}`;
        ctx.fillStyle = color;
        ctx.fillText(src, textX, size + 10);
      };

      ctx.beginPath();
      const leftText = {
        size: 15,
        family: 'Arial',
        color: 'white',
        src: 'original video',
        textX: 10
      };
      drawText(leftText.size, leftText.family, leftText.color, leftText.src, leftText.textX);

      ctx.beginPath();
      const rightText = {
        size: 15,
        family: 'Arial',
        color: 'white',
        src: 'SR video',
        textX: canvas.width - ctx.measureText('SR video').width - 10
      };
      drawText(rightText.size, rightText.family, rightText.color, rightText.src, rightText.textX);

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
    <SComparableVideoViewer>
      <canvas ref={canvasRef} />
      <video style={{ display: 'none' }} ref={videoRef} src={src} controls={true} />
      <div>
        <SButton onClick={startAnim}>Start</SButton>
        <SButton onClick={pauseAnim}>Pause</SButton>
      </div>
    </SComparableVideoViewer>
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

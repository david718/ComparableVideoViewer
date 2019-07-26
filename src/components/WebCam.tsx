import * as React from 'react';
import * as _ from 'lodash';
import { Player, ControlBar } from 'video-react';

import workers from '../main/workers';

interface Props {}

interface States {
  srcStream: any;
  player: any;
  currentTime: any;
}

class WebCam extends React.Component<Props, States> {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: Props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.state = {
      srcStream: '',
      player: {},
      currentTime: 0
    };
  }

  componentDidMount() {
    this.enableVideo();
  }

  handlePlayerStateChange(state: any, prevState: any) {
    // copy player state to this component's state
    this.setState({
      player: state,
      currentTime: state.currentTime
    });
    console.log(state);
  }

  streamToImage(stream: MediaStream): ReadableStream {
    const config = {
      type: 'video',
      mimeType: 'video/webm',
      frameRate: 2,
      width: 640,
      height: 480,
      bitrate: 1200
    };

    return new ReadableStream({
      start: controller => {
        let getImageInterval: number;
        const cvs = document.createElement('canvas');
        const video = document.createElement('video');

        video.srcObject = stream;
        video.onplaying = () => {
          cvs.width = config.width;
          cvs.height = config.height;
          const ctx = cvs.getContext('2d');
          const frameTimeout = 1000 / config.frameRate;
          getImageInterval = window.setInterval((): void => {
            if (!ctx) {
              return;
            }
            ctx.drawImage(video, 0, 0);
            controller.enqueue(ctx.getImageData(0, 0, config.width, config.height));
          }, frameTimeout);
        };
        video.onpause = () => {
          clearInterval(getImageInterval);
        };
        video.play();
      }
    });
  }

  async enableVideo(): Promise<void> {
    return navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(localMediaStream => {
        console.log(localMediaStream);
        console.log(`deviceId : ${localMediaStream.getVideoTracks()[0].getSettings().deviceId}`);
        console.log(`height   : ${localMediaStream.getVideoTracks()[0].getSettings().height}`);
        console.log(`width    : ${localMediaStream.getVideoTracks()[0].getSettings().width}`);
        console.log(`frameRate: ${localMediaStream.getVideoTracks()[0].getSettings().frameRate}`);

        if (!this.videoRef.current || !this.canvasRef.current) {
          return;
        }

        this.videoRef.current.srcObject = localMediaStream;
        this.canvasRef.current.width =
          localMediaStream.getVideoTracks()[0].getSettings().width || 0;
        this.canvasRef.current.height =
          localMediaStream.getVideoTracks()[0].getSettings().height || 0;

        const landmarks: number[][][] = [
          [
            [313.66843, 316.53018],
            [393.5968, 317.533],
            [360.49908, 359.6803],
            [320.67554, 401.71634],
            [383.3436, 402.46252]
          ]
        ];

        this.canvasRef.current.getContext('2d');

        this.streamToImage(localMediaStream).pipeTo(
          new WritableStream({
            write: image => {
              console.log(image.data.buffer);
            }
          })
        );
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <video autoPlay={true} ref={this.videoRef} />
        <canvas ref={this.canvasRef} style={{ position: 'absolute' }} />
      </div>
    );
  }
}

export default WebCam;

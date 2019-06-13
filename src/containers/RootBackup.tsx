// import * as React from 'react';
// import * as _ from 'lodash';
// import * as recordrtc from 'recordrtc';
// import { remote, desktopCapturer } from 'electron';
// import * as fs from 'fs';

// import './App.scss';

// export interface Props {}

// interface States {
//   url: string;
// }

// class App extends React.Component<Props, States> {
//   videoRef: React.RefObject<any>;
//   videoSecondRef: React.RefObject<any>;

//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       url: ''
//     };
//     this.videoRef = React.createRef();
//     this.videoSecondRef = React.createRef();
//   }

//   componentDidMount() {
//     this.rtc();
//   }

//   async rtc() {
//     navigator.getUserMedia(
//       { audio: false, video: true },
//       localMediaStream => {
//         console.log(localMediaStream);

//         console.log(`deviceId : ${localMediaStream.getVideoTracks()[0].getSettings().deviceId}`);
//         console.log(`height   : ${localMediaStream.getVideoTracks()[0].getSettings().height}`);
//         console.log(`width    : ${localMediaStream.getVideoTracks()[0].getSettings().width}`);
//         console.log(`frameRate: ${localMediaStream.getVideoTracks()[0].getSettings().frameRate}`);

//         this.videoRef.current.srcObject = localMediaStream;

//         const config = {
//           type: 'video',
//           mimeType: 'video/webm',
//           frameRate: 2,
//           width: 640,
//           height: 480,
//           bitrate: 1200
//         };
//         // let recorder = new recordrtc.WebAssemblyRecorder(localMediaStream, config);
//         // recorder.record();

//         new ReadableStream({
//           start(controller) {
//             let cvs = document.createElement('canvas');
//             let video = document.createElement('video');
//             video.srcObject = localMediaStream;
//             video.onplaying = function() {
//               cvs.width = config.width;
//               cvs.height = config.height;
//               let ctx = cvs.getContext('2d');
//               let frameTimeout = 1000 / config.frameRate;
//               setTimeout(function f() {
//                 if (!ctx) {
//                   return;
//                 }
//                 ctx.drawImage(video, 0, 0);
//                 controller.enqueue(ctx.getImageData(0, 0, config.width, config.height));
//                 setTimeout(f, frameTimeout);
//               }, frameTimeout);
//             };
//             video.play();
//           }
//         }).pipeTo(
//           new WritableStream({
//             write(image) {
//               console.log(image.data.buffer);
//             }
//           })
//         );

//         // setTimeout(() => {
//         //   recorder.stop(blob => {
//         //     console.log(`blob.size: ${blob.size}`);
//         //     this.videoSecondRef.current.src = URL.createObjectURL(blob);

//         //     new Response(blob).arrayBuffer()
//         //       .then(buf => {
//         //         fs.createWriteStream('/home/jeewangue/workspace/nalbi/airport-detector/fifo', {
//         //           flags: 'a',
//         //           encoding: 'binary',
//         //         }).end(
//         //           Buffer.from(buf)
//         //         );
//         //       })
//         //       .catch(err => {
//         //         console.error(err);
//         //       });
//         //   });
//         // }, 1000);

//         // const anyWindow: any = window;
//         // const url: string = anyWindow.URL.createObjectURL(localMediaStream);
//         // this.setState({ url });
//       },
//       err => {
//         console.error(err);
//       }
//     );

//     // desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async (sources: any) => {
//     //   console.log(sources);
//     //   for (const source of sources) {
//     //     if (source.name === 'Entire screen') {
//     //       const anyNavigator: any = navigator;
//     //       const stream: any = await anyNavigator.mediaDevices.getUserMedia({audio: false, video: {
//     //         mandatory: {
//     //           chromeMediaSource: 'desktop',
//     //           chromeMediaSourceId: source.id,
//     //           minWidth: 1280,
//     //           maxWidth: 1280,
//     //           minHeight: 720,
//     //           maxHeight: 720
//     //         },
//     //       }});
//     //       console.log(stream);
//     //       // const url: string = window.URL.createObjectURL(stream);
//     //       this.setState({ url: stream });
//     //     }
//     //   }
//     // })

//     // let recorder = new RecordRTC.RecordRTCPromisesHandler(stream, {
//     //     type: 'video'
//     // });
//     // recorder.startRecording();

//     // const sleep = m => new Promise(r => setTimeout(r, m));
//     // await sleep(3000);

//     // await recorder.stopRecording();
//     // let blob = await recorder.getBlob();
//     // invokeSaveAsDialog(blob);
//   }

//   render() {
//     const { url } = this.state;
//     return (
//       <div>
//         <video autoPlay={true} ref={this.videoRef}/>
//         <video autoPlay={true} loop={true} ref={this.videoSecondRef}/>
//       </div>
//     );
//   }
// }

// export default App;

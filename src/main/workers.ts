import * as fs from 'fs';
import { spawn } from 'child_process';

export default {
  /**
   * piped decoder (webm -> rgb24 frame images)
   * decode webm stream to rgb24 format using ffmpeg
   * @param {string} fifo **absolute path** of named pipe for stdin of ffmpeg
   * @example fifo: /tmp/airport-detector-ffmpeg-fifo
   */
  decoder: (fifo: string) =>
    spawn(
      `ffmpeg -hide_banner -loglevel panic -f webm -i pipe:0 -f rawvideo -pix_fmt rgb24 pipe:1 < ${fifo}`,
      {
        shell: true,
        stdio: [null, 'pipe', 'pipe']
      }
    ),

  /**
   * piped face detector (RetinaFace)
   *
   */
  detect: () =>
    spawn(
      '/home/jeewangue/.local/share/virtualenvs/insightface-TITRG_Cb/bin/python -u test_pipe.py',
      {
        shell: true,
        cwd: '/home/jeewangue/workspace/nalbi/insightface/RetinaFace',
        stdio: ['pipe', 'pipe', 'pipe'],
        env: {
          MXNET_CUDNN_AUTOTUNE_DEFAULT: '0'
        }
      }
    )
};

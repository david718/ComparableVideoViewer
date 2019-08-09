/*
  SampleVideo
*/

export interface VideoStream {
  index: number;
  codec_name: string;
  codec_long_name: string;
  profile: string;
  codec_type: 'video';
  codec_time_base: string;
  codec_tag_string: string;
  codec_tag: string;
  width: number;
  height: number;
  coded_width: number;
  coded_height: number;
  has_b_frames: number;
  sample_aspect_ratio: string;
  display_aspect_ratio: string;
  pix_fmt: string;
  level: number;
  chroma_location: string;
  refs: number;
  is_avc: string;
  nal_length_size: string;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts: number;
  start_time: string;
  duration_ts: number;
  duration: string;
  bit_rate: string;
  bits_per_raw_sample: string;
  nb_frames: string;
  disposition: {
    default: number;
    dub: number;
    original: number;
    comment: number;
    lyrics: number;
    karaoke: number;
    forced: number;
    hearing_impaired: number;
    visual_impaired: number;
    clean_effects: number;
    attached_pic: number;
  };
  tags: {
    language: string;
    handler_name: string;
  };
}

export interface AudioStream {
  index: number;
  codec_name: string;
  codec_long_name: string;
  profile: string;
  codec_type: 'audio';
  codec_time_base: string;
  codec_tag_string: string;
  codec_tag: string;
  sample_fmt: string;
  sample_rate: string;
  channels: number;
  channel_layout: string;
  bits_per_sample: number;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts: number;
  start_time: string;
  duration_ts: number;
  duration: string;
  bit_rate: string;
  max_bit_rate: string;
  nb_frames: string;
  disposition: {
    default: number;
    dub: number;
    original: number;
    comment: number;
    lyrics: number;
    karaoke: number;
    forced: number;
    hearing_impaired: number;
    visual_impaired: number;
    clean_effects: number;
    attached_pic: number;
  };
  tags: {
    creation_time: string;
    language: string;
    handler_name: string;
  };
}
export interface Info {
  streams: [VideoStream, AudioStream];
}

export interface Anim {
  id: string;
  path: string;
  info: Info;
}

export default interface Schema {
  anims: Anim[];
  selectAnimId: string;
  barX: number;
}

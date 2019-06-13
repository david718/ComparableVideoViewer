/**
 * Processor
 */
export interface Processor {
  id: string;
  name: string;
  description: string;
  run: string;
}

/**
 * SampleImage
 */
export interface Metadata {
  Format: string;
  Geometry: string;
  Resolution: string;
  path: string;
  [key: string]: any;
}

export interface ProcessorInfo {
  id: Processor['id'];
  status: 'unprocessed' | 'processed' | 'Error';
  name: string;
  resultPath?: string;
  errorMsg?: string;
  metadata?: Metadata;
}

export interface SampleImage {
  id: string;
  path: string;
  metadata: Metadata;
  processors: ProcessorInfo[];
}

/**
 * ETC
 */

export interface User {
  name: string;
}

export interface Setting {
  user: User;
  count: number;
  [key: string]: any;
}

export default interface Schema {
  processors: Processor[];
  sampleImages: SampleImage[];
  setting: Setting;
}

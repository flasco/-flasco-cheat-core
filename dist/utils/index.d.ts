/// <reference types="node" />
import cv from 'opencv4nodejs';
export declare function base642Mat(base64text: string): cv.Mat;
export declare function binary2Mat(buffer: Buffer): cv.Mat;
export declare function delay(ms: number): Promise<void>;

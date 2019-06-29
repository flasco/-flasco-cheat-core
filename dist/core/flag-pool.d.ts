import cv from 'opencv4nodejs';
declare class FlagPool {
    private appMap;
    getFlag(flagPath: string, needStore?: boolean): cv.Mat;
}
declare const flagPool: FlagPool;
export = flagPool;

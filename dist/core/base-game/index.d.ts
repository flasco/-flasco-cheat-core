import cv from 'opencv4nodejs';
import Base from '../base';
interface IOptions {
    triedCnt: number;
    threshold: number;
}
declare type IMGORstring = cv.Mat | string;
declare class GameCommon extends Base {
    clickFlag(flag: IMGORstring, threshold?: number): Promise<boolean>;
    tryClickREP(needCnt: number | undefined, maxFailedCnt: number | undefined, flag: IMGORstring, threshold?: number): Promise<boolean>;
    waitUntil(flag: IMGORstring, options: IOptions): Promise<any>;
    isSimple(img: IMGORstring, containImg: IMGORstring, threshold?: number): boolean;
}
export = GameCommon;

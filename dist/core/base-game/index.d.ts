import Base, { IMGORstring } from '../base';
interface IOptions {
    triedCnt?: number;
    threshold?: number;
}
declare class GameCommon extends Base {
    clickFlag(flag: IMGORstring, threshold?: number): Promise<boolean>;
    tryClickREP(needCnt: number | undefined, maxFailedCnt: number | undefined, flag: IMGORstring, threshold?: number): Promise<boolean>;
    waitUntil(flag: IMGORstring, options: IOptions): Promise<import("opencv4nodejs").Mat | undefined>;
    isSimple(img: IMGORstring, containImg: IMGORstring, threshold?: number): boolean;
}
export = GameCommon;

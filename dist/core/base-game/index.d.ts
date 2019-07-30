import Base, { IMGORstring } from '../base';
interface IOptions {
    triedCnt?: number;
    threshold?: number;
}
interface IREPOtion {
    threshold?: number;
    baseX?: number;
    baseY?: number;
    baseXY?: number;
    randX?: number;
    randY?: number;
    randXY?: number;
}
declare class GameCommon extends Base {
    /**
     * 检测是否有需要点击的确定按钮，是则点击并返回true，否则返回false
     * @param flag 要点击的图片
     * @param threshold 阈值，默认 0.75
     * @returns 否有需要点击的确定按钮
     */
    clickFlag(flag: IMGORstring, options?: IREPOtion): Promise<boolean>;
    /**
     * 重复点击，最大失败次数
     * @param needCnt 点击次数
     * @param maxFailedCnt 最大失败数
     * @param flag 要点击的图片
     * @param threshold 阈值，默认 0.75
     */
    tryClickREP(needCnt: number | undefined, maxFailedCnt: number | undefined, flag: IMGORstring, options?: IREPOtion): Promise<boolean>;
    /**
     * 一直等待直到出现符合条件的图片，无返回值时意味着失败了
     * @param flag 标志图片
     * @param opt 额外选项
     */
    waitUntil(flag: IMGORstring, options?: IOptions): Promise<import("opencv4nodejs").Mat | undefined>;
    /**
     * 一直检测直到没有子图片存在，如果在尝试次数之内还有就返回 false
     * @param flag 字图片
     * @param options 可选项
     */
    checkUntilNot(flag: IMGORstring, options?: IOptions): Promise<boolean>;
    /**
     * 在父图片中查找子图片，获取相似度
     * @param sonImg 子图片
     * @param fatherImg 父图片
     * @param threshold 阈值 默认0.75
     */
    isSimple(sonImg: IMGORstring, fatherImg: IMGORstring, threshold?: number): boolean;
}
export = GameCommon;

import cv from 'opencv4nodejs';
declare class FlagPool {
    private appMap;
    /**
     * 获取处理成能被 opencv 使用的图片
     * @param flagPath 文件地址
     * @param needStore 是否要持久化
     */
    getFlag(flagPath: string, needStore?: boolean): cv.Mat;
}
declare const flagPool: FlagPool;
export = flagPool;

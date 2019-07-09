import cv from 'opencv4nodejs';
export interface IPoint {
    x: number;
    y: number;
}
declare class Judge {
    private _baseImage;
    private _scale;
    private _index;
    /**
     * 只有在match执行之后才会用到
     */
    result: IPoint | null;
    /**
     * 第几个match
     */
    resId: number;
    constructor(img: cv.Mat, scale?: number);
    /**
     * 获取相似度 + 匹配点，已除3
     * @param aimImage 子图片
     */
    matchTemplate: (aimImage: cv.Mat) => {
        simple: number;
        point: {
            x: number;
            y: number;
        };
    };
    /**
     * 获取相似度
     * @param aimImage 子图片
     */
    getSimple: (aimImage: cv.Mat) => number;
    /**
     * 链式调用，一直执行到相似度大于阈值的图片出现为止
     * @param aimImage 子图片
     * @param simpleVal 相似度阈值，默认 0.75
     */
    match: (aimImage: cv.Mat, simpleVal?: number) => this;
}
export default Judge;

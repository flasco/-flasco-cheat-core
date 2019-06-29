import cv from 'opencv4nodejs';
export interface IPoint {
    x: number;
    y: number;
}
declare class Judge {
    private _baseImage;
    private _scale;
    private _index;
    result: IPoint | null;
    resId: number;
    constructor(img: cv.Mat, scale?: number);
    matchTemplate: (aimImage: cv.Mat) => {
        simple: number;
        point: {
            x: number;
            y: number;
        };
    };
    getSimple: (aimImage: cv.Mat) => number;
    match: (aimImage: cv.Mat, simpleVal?: number) => this;
}
export default Judge;

import cv from 'opencv4nodejs';
declare class Judge {
    private _baseImage;
    private _scale;
    private _index;
    result: null | object;
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
export = Judge;

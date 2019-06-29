import cv from 'opencv4nodejs';
import { Client, Session } from '@flasco/wda-driver';
import Judge from '../base-judge';
interface IProps {
    client: Client;
    session: Session;
    width: number;
    height: number;
    scale: number;
}
declare type IMGORstring = cv.Mat | string;
declare class BaseApp {
    client: Client;
    session: Session;
    width: number;
    height: number;
    scale: number;
    constructor(props: IProps);
    init: Function | undefined;
    tap(x: number, y: number, needRandom?: boolean, randX?: number, randY?: number): Promise<void>;
    chainOperation(actions: object[]): Promise<void>;
    drag(x1: number, y1: number, x2: number, y2: number, duration?: number): Promise<void>;
    tapHold(x: number, y: number, delay?: number): Promise<void>;
    screenshot(pathName?: string, needMat?: boolean): Promise<any>;
    judgeMatching(img1: IMGORstring, img2: IMGORstring, needLog?: boolean): {
        simple: number;
        point: {
            x: number;
            y: number;
        };
    };
    getPicture(filePath: string, needStore?: boolean): cv.Mat;
    judge(img: cv.Mat): Judge;
    delay(ms: number): Promise<void>;
}
export = BaseApp;

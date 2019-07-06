import cv from 'opencv4nodejs';
import { Client, Session } from '@flasco/wda-driver';
import { IChainOperation } from '../../utils/chainOperation';
import Judge from '../base-judge';
export interface IProps {
    client: Client;
    session: Session;
    width: number;
    height: number;
    scale?: number;
}
export declare type IMGORstring = cv.Mat | string;
declare class BaseApp {
    client: Client;
    session: Session;
    width: number;
    height: number;
    scale: number;
    constructor(props: IProps);
    init?: Function;
    tap(x: number, y: number, needRandom?: boolean, randX?: number, randY?: number): Promise<void>;
    chainOperation(actions: IChainOperation[]): Promise<void>;
    drag(x1: number, y1: number, x2: number, y2: number, duration?: number): Promise<void>;
    tapHold(x: number, y: number, delay?: number): Promise<void>;
    screenshot(): Promise<cv.Mat>;
    screenshot(pathName: string, needMat: boolean): Promise<void | cv.Mat>;
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
export default BaseApp;

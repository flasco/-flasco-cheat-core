import cv from 'opencv4nodejs';
import { Client, Session } from '@flasco/wda-driver';
import { IChainOperation } from '@flasco/wda-driver/src/interface/IChainItem';
import Judge from '../base-judge';
interface IRandom {
    needRand?: boolean;
    randX?: number;
    randY?: number;
    randXY?: number;
}
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
    /**
     * 点击事件
     * @param x x坐标
     * @param y y坐标
     * @param {IRandom} 随机配置项
     */
    tap(x: number, y: number, randOpt?: IRandom): Promise<void>;
    /**
     * 执行动作链
     * @param actions 动作链
     */
    chainOperation(actions: IChainOperation[]): Promise<void>;
    /**
     * 拖拽
     * @param x1 前坐标x
     * @param y1 前坐标y
     * @param x2 后坐标x
     * @param y2 后坐标y
     * @param duration 耗时，毫秒为单位
     */
    drag(x1: number, y1: number, x2: number, y2: number, duration?: number): Promise<void>;
    /**
     * 长按
     * @param x x坐标
     * @param y y坐标
     * @param duration 持续时间，毫秒
     * @param {IRandom} 随机配置项
     */
    tapHold(x: number, y: number, duration?: number, randOpt?: IRandom): Promise<void>;
    /**
     * 截屏
     */
    screenshot(): Promise<cv.Mat>;
    screenshot(pathName: string, needMat: boolean): Promise<void | cv.Mat>;
    /**
     * 在父图片中查找子图片，获取相似度与起始坐标
     * @param img1 子图片
     * @param img2 父图片
     * @param  needLog 是否需要打印日志，调试用
     */
    judgeMatching(img1: IMGORstring, img2: IMGORstring, needLog?: boolean): {
        simple: number;
        point: {
            x: number;
            y: number;
        };
    };
    /**
     * 获取pic Mat
     * @param filePath 图片文件路径
     * @param needStore 是否需要存储，默认为 true
     */
    getPicture(filePath: string, needStore?: boolean): cv.Mat;
    /**
     * 获取judge
     * @param img 图片
     */
    judge(img: cv.Mat): Judge;
    /**
     * 等待
     * @param ms 毫秒
     */
    delay(ms: number): Promise<void>;
}
export default BaseApp;

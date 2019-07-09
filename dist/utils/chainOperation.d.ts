import { ILongPress, IMoveTo, IPress, IRelease, ITap, IWait } from '@flasco/wda-driver/src/interface/IChainItem';
/**
 * 长按
 * @param x x坐标
 * @param y y坐标
 * @param druation 持续时间
 * @param rand 随机值
 */
export declare function longPress(x: number, y: number, duration: number, rand?: number): [IPress, IWait, IRelease];
/**
 * 等待
 * @param ms 毫秒
 */
export declare function wait(ms: number): IWait;
declare type pointArr = [number, number];
/**
 * 从起点拖拽至终点
 * @param param0 起点
 * @param param1 终点
 * @param druation 拖拽的持续时间
 */
export declare function drag([x1, y1]: pointArr, [x2, y2]: pointArr, duration?: number, rand?: number): [ILongPress, IMoveTo, IWait, IRelease];
/**
 * 点击
 * @param x x坐标
 * @param y y坐标
 * @param rand 随机值
 */
export declare function tap(x: number, y: number, rand?: number): ITap;
export {};

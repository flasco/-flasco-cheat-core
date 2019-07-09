/// <reference types="node" />
import cv from 'opencv4nodejs';
/**
 * 转 base64 图片字符串为 opencv 的 Mat
 * @param base64text base64编码的图片字符串
 */
export declare function base642Mat(base64text: string): cv.Mat;
/**
 * 转二进制流图片为 opencv 的 Mat
 * @param buffer buffer 格式的图片字符串
 */
export declare function binary2Mat(buffer: Buffer): cv.Mat;
/**
 * 休眠
 * @param ms 毫秒
 */
export declare function delay(ms: number): Promise<void>;
/**
 * return = num + rand(x)
 * @param num 要 random 的数
 * @param rand random 的倍数
 */
export declare function getRandom(num: number, rand?: number): number;

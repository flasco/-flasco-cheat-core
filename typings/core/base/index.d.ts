/// <reference types="node" />

/// <reference path="../flag-pool.d.ts" />
/// <reference path="../base-judge/index.d.ts" />
/// <reference path="../../utils/index.d.ts" />
/// <reference path="../../utils/chainOperation.d.ts" />

declare module '@flasco/cheat-core/src/core/base' {
  import * as cv from 'opencv4nodejs';
  import { Client, Session } from '@flasco/wda-driver';
  import { base642Mat } from '@flasco/cheat-core/src/utils';
  import { actionInf } from '@flasco/cheat-core/src/utils/chainOperation';
  import flagPool from '@flasco/cheat-core/src/core/flag-pool';
  import Judge = require('@flasco/cheat-core/src/core/base-judge');

  interface MatchRes {
    simple: number;
    point: {
      x: number;
      y: number;
    };
  }

  interface BaseProps {
    width: number;
    height: number;
    client: object;
    session: object;
  }

  // 这里提供一些最基础的能力
  class BaseApp {
    constructor(props: BaseProps);
    client: Client;
    session: Session;
    width: number;
    height: number;

    /**
     * 点击事件
     * @param x x坐标
     * @param y y坐标
     * @param needRandom 是否需要生成随机量
     * @param randX x坐标随机的量, 不填的话默认是5
     * @param randY y坐标随机的量, 不填的话跟randX一个值
     */
    tap(
      x: number,
      y: number,
      needRandom: boolean,
      randX: number,
      randY: number
    ): Promise<void>;

    /**
     * 执行动作链
     * @param actions 动作链
     */
    chainOperation(
      actions: Array<
      actionInf.press | actionInf.release | actionInf.tap | actionInf.wait
      >
    ): Promise<void>;

    /**
     * 拖拽
     * @param x1 前坐标x
     * @param y1 前坐标y
     * @param x2 后坐标x
     * @param y2 后坐标y
     * @param duration 耗时，秒为单位
     */
    drag(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      duration: number
    ): Promise<void>;

    /**
     * 长按
     * @param x x坐标
     * @param y y坐标
     * @param delay 秒为单位
     */
    tapHold(x: number, y: number, delay: number): Promise<void>;

    /**
     * 截屏
     * @param {string} pathName 文件路径
     * @param {boolean} needMat 是否需要返回Mat
     */
    screenshot(pathName: string, needMat: boolean): Promise<string | cv.Mat>;

    /**
     * 在父图片中查找子图片，获取相似度与起始坐标
     * @param img1 子图片
     * @param img2 父图片
     * @param  needLog 是否需要打印日志，调试用
     */
    judgeMatching(
      img1: cv.Mat | string,
      img2: cv.Mat | string,
      needLog: boolean
    ): MatchRes;

    /**
     * 获取pic Mat
     * @param filePath 图片文件路径
     * @param needStore 是否需要存储，默认为 true
     */
    getPicture(filePath: string, needStore: boolean): cv.Mat;

    /**
     * 等待
     * @param ms 毫秒
     */
    delay(ms: number): Promise<void>;

    /**
     * 获取judge
     * @param img 图片
     */
    judge(img: string | cv.Mat): Judge;
  }

  export = BaseApp;
}

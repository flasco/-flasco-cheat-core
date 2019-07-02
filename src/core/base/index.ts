import cv from 'opencv4nodejs';
import Logger from '@flasco/logger';
import { Client, Session } from '@flasco/wda-driver';

import { IChainOperation } from '../../utils/chainOperation';
import { binary2Mat, delay } from '../../utils';
import flagPool from '../flag-pool';
import Judge from '../base-judge';

export interface IProps {
  client: Client;
  session: Session;
  width: number;
  height: number;
  scale?: number;
}

export type IMGORstring = cv.Mat | string;

class BaseApp {
  client: Client;
  session: Session;
  width: number;
  height: number;
  scale: number;

  constructor(props: IProps) {
    const { client, session, width, height, scale = 3 } = props;
    this.client = client;
    this.session = session;
    this.width = width;
    this.height = height;
    this.scale = scale;

    this.init && this.init(props);
  }

  init?: Function;

  /**
   * 点击事件
   * @param x x坐标
   * @param y y坐标
   * @param needRandom 是否需要生成随机量
   * @param randX x坐标随机的量, 不填的话默认是5
   * @param randY y坐标随机的量, 不填的话跟randX一个值
   */
  async tap(
    x: number,
    y: number,
    needRandom = false,
    randX?: number,
    randY?: number
  ) {
    if (randX == null) {
      randX = 5;
      randY = 5;
    }
    if (randY == null) {
      randY = randX;
    }
    if (needRandom) {
      x += Math.random() * randX;
      y += Math.random() * randY;
    }
    x = Math.round(x * 100) / 100;
    y = Math.round(y * 100) / 100;

    // this.log(`tap [${x}, ${y}]`);
    try {
      await this.session.tap(x, y);
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }
  /**
   * 执行动作链
   * @param actions 动作链
   */
  async chainOperation(actions: IChainOperation[]) {
    try {
      await this.session.chainOperation(actions);
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }
  /**
   * 拖拽
   * @param x1 前坐标x
   * @param y1 前坐标y
   * @param x2 后坐标x
   * @param y2 后坐标y
   * @param duration 耗时，秒为单位
   */
  async drag(x1: number, y1: number, x2: number, y2: number, duration = 0.7) {
    try {
      await this.session.swipe(x1, y1, x2, y2, duration);
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }
  /**
   * 长按
   * @param x x坐标
   * @param y y坐标
   * @param delay 秒为单位
   */
  async tapHold(x: number, y: number, delay = 1.0) {
    x = Math.round(x * 100) / 100;
    y = Math.round(y * 100) / 100;
    // this.log(`tapHold [${x}, ${y}]`);
    try {
      await this.session.tapHold(x, y, delay);
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }

  /**
   * 截屏
   */
  async screenshot(): Promise<cv.Mat>;
  async screenshot(pathName: string, needMat: boolean): Promise<void | cv.Mat>;
  async screenshot(pathName?: any, needMat?: boolean): Promise<any> {
    // const msg = pathName !== '' ? ` pathName - ${pathName}` : '';
    try {
      pathName !== '' && Logger.info('screenshot! pathName -', pathName);
      const binary = await this.client.screenshot(pathName);
      if (needMat && binary != null) return binary2Mat(binary);
      return binary;
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }
  /**
   * 在父图片中查找子图片，获取相似度与起始坐标
   * @param img1 子图片
   * @param img2 父图片
   * @param  needLog 是否需要打印日志，调试用
   */
  judgeMatching(
    img1: IMGORstring,
    img2: IMGORstring,
    needLog: boolean = false
  ) {
    if (img1 == null || img2 == null) throw new Error('图像不能为空！');
    if (typeof img1 === 'string') img1 = this.getPicture(img1);
    if (typeof img2 === 'string') img2 = this.getPicture(img2);

    const result = new Judge(img1, this.scale).matchTemplate(img2);

    needLog && Logger.info(`maxSimple - ${result.simple.toFixed(2)}`);
    // 之所以返回除以3，是因为屏幕缩放倍数的原因
    return result;
  }
  /**
   * 获取pic Mat
   * @param filePath 图片文件路径
   * @param needStore 是否需要存储，默认为 true
   */
  getPicture(filePath: string, needStore: boolean = true) {
    return flagPool.getFlag(filePath, needStore);
  }
  /**
   * 获取judge
   * @param img 图片
   */
  judge(img: cv.Mat) {
    return new Judge(img, this.scale);
  }
  /**
   * 等待
   * @param ms 毫秒
   */
  delay(ms: number) {
    return delay(ms);
  }
}

export default BaseApp;

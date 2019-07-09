import cv from 'opencv4nodejs';
import Logger from '@flasco/logger';
import { Client, Session } from '@flasco/wda-driver';
import { IChainOperation } from '@flasco/wda-driver/src/interface/IChainItem';

import { drag, longPress } from '../../utils/chainOperation';
import { binary2Mat, delay, getRandom } from '../../utils';
import flagPool from '../flag-pool';
import Judge from '../base-judge';

interface IRandom {
  needRand?: boolean;
  randX?: number;
  randY?: number;
}

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
   * @param {IRandom} 随机配置项
   */
  async tap(
    x: number,
    y: number,
    randOpt: IRandom = {}
  ) {
    let {
      needRand = false,
      randX = 3,
      randY = 3
    } = randOpt;

    if (!needRand) {
      randX = 0;
      randY = 0;
    }
    x = getRandom(x, randX);
    y = getRandom(y, randY);
    try {
      await this.chainOperation([
        {
          action: 'tap',
          options: {
            x,
            y,
          },
        },
      ]);
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
   * @param duration 耗时，毫秒为单位
   */
  async drag(x1: number, y1: number, x2: number, y2: number, duration = 700) {
    try {
      await this.chainOperation(drag([x1, y1], [x2, y2], duration));
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }
  
  /**
   * 长按
   * @param x x坐标
   * @param y y坐标
   * @param duration 持续时间，毫秒
   * @param {IRandom} 随机配置项
   */
  async tapHold(
    x: number,
    y: number, 
    duration = 800, 
    randOpt: IRandom = {}
  ) {
    let {
      needRand = false,
      randX = 3,
      randY = 3
    } = randOpt;

    if (!needRand) {
      randX = 0;
      randY = 0;
    }
    x = getRandom(x, randX);
    y = getRandom(y, randY);
    try {
      await this.chainOperation(longPress(x, y, duration));
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }

  /**
   * 截屏
   */
  async screenshot(): Promise<cv.Mat>;
  async screenshot(pathName: string, needMat: boolean): Promise<void | cv.Mat>;
  async screenshot(pathName = '', needMat = true): Promise<any> {
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

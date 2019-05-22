/// <reference types="node" />

/// <reference path="../base/index.d.ts" />
/// <reference path="../../utils/index.d.ts" />
/// <reference path="../../utils/chainOperation.d.ts" />

declare module '@flasco/cheat-core/src/core/base-game' {
  import * as cv from 'opencv4nodejs';
  import Base = require('@flasco/cheat-core/src/core/base');
  import { delay } from '@flasco/cheat-core/src/utils';

  // 这里存放一些game的基础function
  class GameCommon extends Base {
    /**
     * 检测是否有需要点击的确定按钮，是则点击并返回true，否则返回false
     * @param flag 要点击的图片
     * @param threshold 阈值，默认 0.75
     * @returns 否有需要点击的确定按钮
     */
    clickFlag(flag: cv.Mat | string, threshold: number): Promise<boolean>;

    /**
     * 重复点击，最大失败次数
     * @param needCnt 点击次数
     * @param maxFailedCnt 最大失败数
     * @param flag 要点击的图片
     * @param threshold 阈值，默认 0.75
     */
    tryClickREP(
      needCnt: number,
      maxFailedCnt: number,
      flag: cv.Mat | string,
      threshold: number
    ): Promise<boolean>;

    /**
     * 一直等待直到出现符合条件的图片
     * @param flag 标志图片
     * @param opt 额外选项
     */
    waitUntil(
      flag: string | cv.Mat,
      opt?: { triedCnt: number; threshold: number }
    ): Promise<cv.Mat>;

    /**
     * 在父图片中查找子图片，获取相似度
     * @param img 子图片
     * @param containImg 父图片
     * @param threshold 阈值 默认0.75
     */
    isSimple(
      img: cv.Mat | string,
      containImg: cv.Mat | string,
      threshold: number
    ): boolean;
  }

  export = GameCommon;
}

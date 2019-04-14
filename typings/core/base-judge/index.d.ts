/// <reference types="node" />

declare module '@flasco/cheat-core/src/core/base-judge' {
  import * as cv from 'opencv4nodejs';

  interface Point {
    x: number
    y: number
  }

  // 这里存放一些game的基础function
  class Judge {
    constructor(img: cv.Mat)

    /**
     * 只有在match执行之后才会用到
     */
    result: Point | null

    /**
     * 第几个match
     */
    resId: number

    /**
     * 获取相似度 + 匹配点，已除3
     * @param aimImage 子图片
     */
    matchTemplate(aimImage: cv.Mat): { point: Point, simple: number }
    
    /**
     * 获取相似度
     * @param aimImage 子图片
     */
    getSimple(aimImage: cv.Mat): number

    /**
     * 链式调用，一直执行到相似度大于阈值的图片出现为止
     * @param aimImage 子图片
     * @param simpleVal 相似度阈值，默认 0.75
     */
    match(aimImage: cv.Mat, simpleVal?: number): Judge
  }

  export = Judge;
}

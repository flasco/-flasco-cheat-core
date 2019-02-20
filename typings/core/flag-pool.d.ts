import * as cv from 'opencv4nodejs';

declare class FlagPool {
  private appMap: Object
  /**
   * 获取处理成能被 opencv 使用的图片
   * @param flagPath 文件地址
   */
  getFlag(flagPath: string): cv.Mat
}

export default FlagPool;

import cv from 'opencv4nodejs';

class FlagPool {
  private appMap: Map<string, cv.Mat> = new Map();

  /**
   * 获取处理成能被 opencv 使用的图片
   * @param flagPath 文件地址
   * @param needStore 是否要持久化
   */
  getFlag(flagPath: string, needStore: boolean = true): cv.Mat {
    if (this.appMap.get(flagPath) == null) {
      const img = cv.imread(flagPath);
      if (!needStore) return img;
      this.appMap.set(flagPath, img);
    }

    return <cv.Mat>this.appMap.get(flagPath);
  }
}

const flagPool = new FlagPool();

export = flagPool;

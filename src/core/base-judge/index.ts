import cv from 'opencv4nodejs';

class Judge {
  private _baseImage: cv.Mat;
  private _scale: number;
  private _index: number = 0;

  /**
   * 只有在match执行之后才会用到
   */
  result: null | object = null;

  /**
   * 第几个match
   */
  resId: number = -1;

  constructor(img: cv.Mat, scale = 3) {
    this._baseImage = img;
    this._scale = scale;
  }

  /**
   * 获取相似度 + 匹配点，已除3
   * @param aimImage 子图片
   */
  matchTemplate = (aimImage: cv.Mat) => {
    const matched = this._baseImage.matchTemplate(
      aimImage,
      cv.TM_CCOEFF_NORMED
    );
    const {
      maxLoc: { x, y },
      maxVal,
    } = matched.minMaxLoc();
    return {
      simple: maxVal,
      point: { x: x / this._scale, y: y / this._scale },
    };
  };

  /**
   * 获取相似度
   * @param aimImage 子图片
   */
  getSimple = (aimImage: cv.Mat) => {
    const { simple } = this.matchTemplate(aimImage);
    return simple;
  };

  /**
   * 链式调用，一直执行到相似度大于阈值的图片出现为止
   * @param aimImage 子图片
   * @param simpleVal 相似度阈值，默认 0.75
   */
  match = (aimImage: cv.Mat, simpleVal = 0.75) => {
    this._index++;
    if (this.result == null) {
      const { point, simple } = this.matchTemplate(aimImage);

      if (simple > simpleVal) {
        this.result = point;
        this.resId = this._index;
      }
    }

    return this;
  };
}

export = Judge;

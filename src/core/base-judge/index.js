const cv = require('opencv4nodejs');

class Judge {
  constructor(img) {
    this._baseImage = img;
    this.result = null;
    this.resId = -1;
    this._index = 0;
    this.match = this.match.bind(this);
  }

  matchTemplate(aimImage) {
    const matched = this._baseImage.matchTemplate(
      aimImage,
      cv.TM_CCOEFF_NORMED
    );
    const {
      maxLoc: { x, y },
      maxVal
    } = matched.minMaxLoc();
    return {
      simple: maxVal,
      point: { x: x / 3, y: y / 3 }
    };
  }

  getSimple(aimImage) {
    const { simple } = this._matchTemplate(aimImage);
    return simple;
  }

  match(aimImage, simpleVal = 0.75) {
    this._index++;
    if (this.result == null) {
      const { point, simple } = this._matchTemplate(aimImage);

      if (simple > simpleVal) {
        this.result = point;
        this.resId = this._index;
      }
    }

    return this;
  }
}

module.exports = Judge;

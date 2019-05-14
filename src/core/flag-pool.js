const cv = require('opencv4nodejs');

class FlagPool {
  constructor() {
    this.appMap = {};
  }

  getFlag(flagPath, needStore = true) {
    if (this.appMap[flagPath] == null) {
      const img = cv.imread(flagPath);
      if (!needStore) return img;
      this.appMap[flagPath] = img;
    }
    return this.appMap[flagPath];
  }
}

const flagPool = new FlagPool();

module.exports = flagPool;

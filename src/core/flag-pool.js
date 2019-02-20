const cv = require('opencv4nodejs');

class FlagPool {
  constructor() {
    this.appMap = {};
  }

  getFlag(flagPath) {
    if (this.appMap[flagPath] == null) {
      this.appMap[flagPath] = cv.imread(flagPath);
    }
    return this.appMap[flagPath];
  }
}

const flagPool = new FlagPool();

module.exports = flagPool;

const Base = require('../base');

const { delay } = require('../../utils');

// 这里存放一些game的基础function
class GameCommon extends Base {
  async clickFlag(flag) {
    const img = await this.screenshot();
    const {
      simple,
      point: { x, y }
    } = this.judgeMatching(img, flag);
    if (simple > 0.8) {
      await this.tap(x, y, true);
      return true;
    }
    return false;
  }

  async tryClickREP(needCnt = 1, maxFailedCnt = 3, flag) {
    let cnt = 0;
    let failedCnt = 0;
    while (cnt < needCnt) {
      await delay(1100);
      const isClick = await this.clickFlag(flag);
      if (isClick) {
        cnt++;
        failedCnt = 0;
      } else {
        failedCnt++;
      }
      if (failedCnt > maxFailedCnt) break;
    }
    if (failedCnt > maxFailedCnt) return false;
    // this.log(`成功点击${cnt}次`, LEVEL_INFO_MAP.success);
    return true;
  }

  async judgeSimple(img, containImg) {
    if (containImg == null) {
      containImg = img;
      img = await this.screenshot();
    }
    const { simple } = this.judgeMatching(img, containImg);
    return simple;
  }
}

module.exports = GameCommon;

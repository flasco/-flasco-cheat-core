const Base = require('../base');

const { delay } = require('../../utils');

// 这里存放一些game的基础function
class GameCommon extends Base {
  async clickFlag(flag, threshold = 0.75) {
    const img = await this.screenshot();
    const {
      simple,
      point: { x, y }
    } = this.judgeMatching(flag, img);
    if (simple > threshold) {
      await this.tap(x, y, true);
      return true;
    }
    return false;
  }

  async tryClickREP(needCnt = 1, maxFailedCnt = 3, flag, threshold = 0.75) {
    let cnt = 0;
    let failedCnt = 0;
    while (cnt < needCnt) {
      await delay(1000 + 1000 * failedCnt);
      const isClick = await this.clickFlag(flag, threshold);
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

  async waitUntil(flag, { triedCnt = 7 }) {
    if (typeof flag === 'string') flag = this.getPicture(flag);
    let sleepSec = 0;
    for (let i = 0; i < triedCnt; i++) {
      sleepSec < 5000 && (sleepSec += 1000);

      const image = await this.screenshot();
      if (this.isSimple(flag, image)) return image;
      await this.delay(sleepSec);
    }
  }

  isSimple(img, containImg, threshold = 0.75) {
    if (img == null || containImg == null) throw new Error('缺失参数...');
    if (typeof img === 'string') img = this.getPicture(img);
    if (typeof containImg === 'string') containImg = this.getPicture(containImg);

    const { simple } = this.judgeMatching(img, containImg);
    return simple > threshold;
  }
}

module.exports = GameCommon;

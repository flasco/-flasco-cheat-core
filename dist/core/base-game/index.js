"use strict";
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("../base"));
const utils_1 = require("../../utils");
class GameCommon extends base_1.default {
    async clickFlag(flag, threshold = 0.75) {
        const img = await this.screenshot();
        const { simple, point: { x, y }, } = this.judgeMatching(flag, img);
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
            await utils_1.delay(1000 + 1000 * failedCnt);
            const isClick = await this.clickFlag(flag, threshold);
            if (isClick) {
                cnt++;
                failedCnt = 0;
            }
            else {
                failedCnt++;
            }
            if (failedCnt > maxFailedCnt)
                break;
        }
        if (failedCnt > maxFailedCnt)
            return false;
        return true;
    }
    async waitUntil(flag, options) {
        const { triedCnt = 3, threshold = 0.75 } = options;
        if (typeof flag === 'string')
            flag = this.getPicture(flag);
        let sleepSec = 0;
        for (let i = 0; i < triedCnt; i++) {
            sleepSec < 5000 && (sleepSec += 1000);
            const image = await this.screenshot();
            if (this.isSimple(flag, image, threshold))
                return image;
            await this.delay(sleepSec);
        }
    }
    isSimple(img, containImg, threshold = 0.75) {
        if (img == null || containImg == null)
            throw new Error('缺失参数...');
        if (typeof img === 'string')
            img = this.getPicture(img);
        if (typeof containImg === 'string')
            containImg = this.getPicture(containImg);
        const { simple } = this.judgeMatching(img, containImg);
        return simple > threshold;
    }
}
module.exports = GameCommon;
//# sourceMappingURL=index.js.map
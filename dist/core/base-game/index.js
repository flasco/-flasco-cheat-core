"use strict";
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("../base"));
const utils_1 = require("../../utils");
// 这里存放一些game的基础function
class GameCommon extends base_1.default {
    /**
     * 检测是否有需要点击的确定按钮，是则点击并返回true，否则返回false
     * @param flag 要点击的图片
     * @param threshold 阈值，默认 0.75
     * @returns 否有需要点击的确定按钮
     */
    async clickFlag(flag, threshold = 0.75) {
        const img = await this.screenshot();
        const { simple, point: { x, y }, } = this.judgeMatching(flag, img);
        if (simple > threshold) {
            await this.tap(x, y, true);
            return true;
        }
        return false;
    }
    /**
     * 重复点击，最大失败次数
     * @param needCnt 点击次数
     * @param maxFailedCnt 最大失败数
     * @param flag 要点击的图片
     * @param threshold 阈值，默认 0.75
     */
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
        // this.log(`成功点击${cnt}次`, LEVEL_INFO_MAP.success);
        return true;
    }
    /**
     * 一直等待直到出现符合条件的图片，无返回值时意味着失败了
     * @param flag 标志图片
     * @param opt 额外选项
     */
    async waitUntil(flag, options) {
        const { triedCnt = 3, threshold = 0.75 } = options || {};
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
    /**
     * 一直检测直到没有子图片存在，如果在尝试次数之内还有就返回 false
     * @param flag 字图片
     * @param options 可选项
     */
    async checkUntilNot(flag, options) {
        const { triedCnt = 3, threshold = 0.75 } = options || {};
        if (typeof flag === 'string')
            flag = this.getPicture(flag);
        let sleepSec = 0;
        for (let i = 0; i < triedCnt; i++) {
            sleepSec < 5000 && (sleepSec += 1000);
            const image = await this.screenshot();
            if (!this.isSimple(flag, image, threshold))
                return true;
            await this.delay(sleepSec);
        }
        return false;
    }
    /**
     * 在父图片中查找子图片，获取相似度
     * @param img 子图片
     * @param containImg 父图片
     * @param threshold 阈值 默认0.75
     */
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
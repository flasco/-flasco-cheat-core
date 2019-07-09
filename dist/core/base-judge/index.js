"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const opencv4nodejs_1 = tslib_1.__importDefault(require("opencv4nodejs"));
class Judge {
    constructor(img, scale = 3) {
        this._index = 0;
        /**
         * 只有在match执行之后才会用到
         */
        this.result = null;
        /**
         * 第几个match
         */
        this.resId = -1;
        /**
         * 获取相似度 + 匹配点，已除3
         * @param aimImage 子图片
         */
        this.matchTemplate = (aimImage) => {
            const matched = this._baseImage.matchTemplate(aimImage, opencv4nodejs_1.default.TM_CCOEFF_NORMED);
            const { maxLoc: { x, y }, maxVal, } = matched.minMaxLoc();
            return {
                simple: maxVal,
                point: { x: x / this._scale, y: y / this._scale },
            };
        };
        /**
         * 获取相似度
         * @param aimImage 子图片
         */
        this.getSimple = (aimImage) => {
            const { simple } = this.matchTemplate(aimImage);
            return simple;
        };
        /**
         * 链式调用，一直执行到相似度大于阈值的图片出现为止
         * @param aimImage 子图片
         * @param simpleVal 相似度阈值，默认 0.75
         */
        this.match = (aimImage, simpleVal = 0.75) => {
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
        this._baseImage = img;
        this._scale = scale;
    }
}
exports.default = Judge;
//# sourceMappingURL=index.js.map
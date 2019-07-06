"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const opencv4nodejs_1 = tslib_1.__importDefault(require("opencv4nodejs"));
class Judge {
    constructor(img, scale = 3) {
        this._index = 0;
        this.result = null;
        this.resId = -1;
        this.matchTemplate = (aimImage) => {
            const matched = this._baseImage.matchTemplate(aimImage, opencv4nodejs_1.default.TM_CCOEFF_NORMED);
            const { maxLoc: { x, y }, maxVal, } = matched.minMaxLoc();
            return {
                simple: maxVal,
                point: { x: x / this._scale, y: y / this._scale },
            };
        };
        this.getSimple = (aimImage) => {
            const { simple } = this.matchTemplate(aimImage);
            return simple;
        };
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
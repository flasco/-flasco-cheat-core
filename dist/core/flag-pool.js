"use strict";
const tslib_1 = require("tslib");
const opencv4nodejs_1 = tslib_1.__importDefault(require("opencv4nodejs"));
class FlagPool {
    constructor() {
        this.appMap = new Map();
    }
    getFlag(flagPath, needStore = true) {
        if (this.appMap.get(flagPath) == null) {
            const img = opencv4nodejs_1.default.imread(flagPath);
            if (!needStore)
                return img;
            this.appMap.set(flagPath, img);
        }
        return this.appMap.get(flagPath);
    }
}
const flagPool = new FlagPool();
module.exports = flagPool;
//# sourceMappingURL=flag-pool.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const opencv4nodejs_1 = tslib_1.__importDefault(require("opencv4nodejs"));
function base642Mat(base64text) {
    const base64data = base64text
        .replace('data:image/jpeg;base64', '')
        .replace('data:image/png;base64', '');
    const buffer = Buffer.from(base64data, 'base64');
    const image = opencv4nodejs_1.default.imdecode(buffer);
    return image;
}
exports.base642Mat = base642Mat;
function binary2Mat(buffer) {
    const image = opencv4nodejs_1.default.imdecode(buffer);
    return image;
}
exports.binary2Mat = binary2Mat;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
//# sourceMappingURL=index.js.map
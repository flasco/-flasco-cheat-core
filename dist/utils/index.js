"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const opencv4nodejs_1 = tslib_1.__importDefault(require("opencv4nodejs"));
/**
 * 转 base64 图片字符串为 opencv 的 Mat
 * @param base64text base64编码的图片字符串
 */
function base642Mat(base64text) {
    const base64data = base64text
        .replace('data:image/jpeg;base64', '')
        .replace('data:image/png;base64', ''); //Strip image type prefix
    const buffer = Buffer.from(base64data, 'base64');
    const image = opencv4nodejs_1.default.imdecode(buffer); //Image is now represented as Mat
    return image;
}
exports.base642Mat = base642Mat;
/**
 * 转二进制流图片为 opencv 的 Mat
 * @param buffer buffer 格式的图片字符串
 */
function binary2Mat(buffer) {
    const image = opencv4nodejs_1.default.imdecode(buffer); //Image is now represented as Mat
    return image;
}
exports.binary2Mat = binary2Mat;
/**
 * 休眠
 * @param ms 毫秒
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.delay = delay;
//# sourceMappingURL=index.js.map
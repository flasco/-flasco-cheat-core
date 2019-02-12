const cv = require('opencv4nodejs');

/**
 * 转 base64 图片字符串为 opencv 的 Mat
 * @param {string} base64text base64编码的图片字符串
 */
function base642Mat(base64text) {
  const base64data = base64text
    .replace('data:image/jpeg;base64', '')
    .replace('data:image/png;base64', ''); //Strip image type prefix
  const buffer = Buffer.from(base64data, 'base64');
  const image = cv.imdecode(buffer); //Image is now represented as Mat
  return image;
}

/**
 * 休眠
 * @param {number} ms 毫秒
 */
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  base642Mat,
  delay,
};

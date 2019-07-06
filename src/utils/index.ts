import cv from 'opencv4nodejs';

/**
 * 转 base64 图片字符串为 opencv 的 Mat
 * @param base64text base64编码的图片字符串
 */
export function base642Mat(base64text: string) {
  const base64data = base64text
    .replace('data:image/jpeg;base64', '')
    .replace('data:image/png;base64', ''); //Strip image type prefix
  const buffer = Buffer.from(base64data, 'base64');
  const image = cv.imdecode(buffer); //Image is now represented as Mat
  return image;
}

/**
 * 转二进制流图片为 opencv 的 Mat
 * @param buffer buffer 格式的图片字符串
 */
export function binary2Mat(buffer: Buffer) {
  const image = cv.imdecode(buffer); //Image is now represented as Mat
  return image;
}

/**
 * 休眠
 * @param ms 毫秒
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

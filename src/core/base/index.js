const Logger = require('@flasco/logger');

const { binary2Mat, delay } = require('../../utils');
const flagPool = require('../flag-pool');
const Judge = require('../base-judge');

class BaseApp {
  constructor({ client = '', session = '', width = '', height = '', scale = 3 }) {
    this.client = client;
    this.session = session;
    this.width = width;
    this.height = height;
    this.scale = scale;
  }

  async tap(x, y, needRandom = false, randX, randY) {
    if (randX == null) {
      randX = 5;
      randY = 5;
    }
    if (randY == null) {
      randY = randX;
    }
    if (needRandom) {
      x += Math.random() * randX;
      y += Math.random() * randY;
    }
    x = Math.round(x * 100) / 100;
    y = Math.round(y * 100) / 100;

    // this.log(`tap [${x}, ${y}]`);
    try {
      await this.session.tap(x, y);
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }

  async chainOperation(actions) {
    try {
      await this.session.chainOperation(actions);
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }

  async drag(x1, y1, x2, y2, duration = 0.7) {
    try {
      await this.session.swipe(x1, y1, x2, y2, duration);
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }

  async tapHold(x, y, delay = 1.0) {
    x = Math.round(x * 100) / 100;
    y = Math.round(y * 100) / 100;
    // this.log(`tapHold [${x}, ${y}]`);
    try {
      await this.session.tapHold(x, y, delay);
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }

  async screenshot(pathName = '', needMat = true) {
    // const msg = pathName !== '' ? ` pathName - ${pathName}` : '';
    try {
      pathName !== '' && Logger.info('screenshot! pathName -', pathName);
      const binary = await this.client.screenshot(pathName);
      if (needMat && binary != null) return binary2Mat(binary);
      return binary;
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }

  judgeMatching(img1, img2, needLog = false) {
    if (img1 == null || img2 == null) throw new Error('图像不能为空！');
    if (typeof img1 === 'string') img1 = this.getPicture(img1);
    if (typeof img2 === 'string') img2 = this.getPicture(img2);

    const result = new Judge(img1, this.scale).matchTemplate(img2);

    needLog && Logger.info(`maxSimple - ${result.simple.toFixed(2)}`);
    // 之所以返回除以3，是因为屏幕缩放倍数的原因
    return result;
  }

  getPicture(filePath, needStore = true) {
    return flagPool.getFlag(filePath, needStore);
  }

  judge(img) {
    return new Judge(img, this.scale);
  }

  delay(ms) {
    return delay(ms);
  }
}

module.exports = BaseApp;

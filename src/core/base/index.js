const formatDate = require('date-fns/format');

const { base642Mat } = require('../../utils');
const { TIP_COLOR, TIP_TEXT, LEVEL_INFO_MAP } = require('../../constants');
const flagPool = require('../flag-pool');
const Judge = require('../base-judge');

class BaseApp {
  constructor({ client = '', session = '', width = '', height = '' }) {
    this.client = client;
    this.session = session;
    this.width = width;
    this.height = height;
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
      pathName !== '' && console.log(`screenshot! pathName - ${pathName}`);
      const base64 = await this.client.screenshot(pathName);
      if (needMat && base64 != null) {
        return base642Mat(base64);
      }
      return base64;
    } catch (error) {
      throw new Error('啊哦，断掉了');
    }
  }

  judgeMatching(img1, img2, needLog = false) {
    if (img1 == null || img2 == null) throw new Error('图像不能为空！');

    const result = new Judge(img1).matchTemplate(img2);

    needLog && console.log(`maxSimple - ${result.simple.toFixed(2)}`);
    // 之所以返回除以3，是因为屏幕缩放倍数的原因
    return result;
  }

  log(str, level = LEVEL_INFO_MAP.info, needTime = true) {
    let content = str;
    if (TIP_COLOR[level] != null) {
      const tip = TIP_COLOR[level](TIP_TEXT[level]);
      content = `${tip} ${str}`;
    }
    if (needTime) console.log(formatDate(new Date(), 'HH:mm:ss'), content);
    else console.log(content);
  }

  getPicture(filePath) {
    return flagPool.getFlag(filePath);
  }
}

module.exports = BaseApp;

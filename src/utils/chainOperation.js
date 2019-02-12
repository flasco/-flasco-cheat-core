/**
 * 长按，记得长按之间要穿插 tap，否则第一次之后就不生效了
 * @param {number} x x坐标
 * @param {number} y y坐标
 * @param {number} druation 持续多少毫秒
 */
function longPress(x, y, druation) {
  return [
    {
      action: 'press',
      options: {
        x,
        y
      }
    },
    {
      action: 'wait',
      options: {
        ms: druation
      }
    },
    { action: 'release' }
  ];
}

/**
 * 等待
 * @param {number} ms 持续多少毫秒
 */
function wait(ms) {
  return {
    action: 'wait',
    options: { ms }
  };
}

/**
 * 
 * @param {number} x x坐标
 * @param {number} y y坐标
 */
function tap(x, y) {
  return {
    action: 'tap',
    options: {
      x,
      y
    }
  };
}

exports.tap = tap;
exports.wait = wait;
exports.longPress = longPress;

const { LEVEL_INFO_MAP } = require('./constants');
const { tap, longPress, wait } = require('./utils/chainOperation');
const { delay, base642Mat } = require('./utils');
const Judge = require('./core/base-judge');

const cheatCore = {
  LEVEL_INFO_MAP,
  delay,
  base642Mat,
  Judge,
  chainOperation: {
    tap,
    longPress,
    wait
  }
};

module.exports = cheatCore;

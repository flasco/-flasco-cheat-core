const { LEVEL_INFO_MAP } = require('./constants');
const { tap, longPress, wait } = require('./utils/chainOperation');
const { delay, base642Mat } = require('./utils');
const FlagPool = require('./core/flag-pool');

const cheatCore = {
  LEVEL_INFO_MAP,
  FlagPool,
  delay,
  base642Mat,
  chainOperation: {
    tap,
    longPress,
    wait
  }
};

module.exports = cheatCore;

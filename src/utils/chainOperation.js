function longPress(x, y, druation, rand = 0) {
  x = getRandom(x, rand);
  y = getRandom(y, rand);
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

function wait(ms) {
  return {
    action: 'wait',
    options: { ms }
  };
}

function tap(x, y, rand = 0) {
  x = getRandom(x, rand);
  y = getRandom(y, rand);
  return {
    action: 'tap',
    options: {
      x,
      y
    }
  };
}

function getRandom(val, rand) {
  const randomX = Math.random() * rand >>> 0;
  return val + randomX;
}

exports.tap = tap;
exports.wait = wait;
exports.longPress = longPress;

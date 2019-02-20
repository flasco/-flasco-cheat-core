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

function wait(ms) {
  return {
    action: 'wait',
    options: { ms }
  };
}

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

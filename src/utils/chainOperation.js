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

function drag([x1, y1], [x2, y2], druation, rand = 0) {
  x1 = getRandom(x1, rand);
  x2 = getRandom(x2, rand);
  y1 = getRandom(y1, rand);
  y2 = getRandom(y2, rand);

  return [
    {
      action: 'press',
      options: {
        x: x1,
        y: y1
      }
    },{
      action: 'wait',
      options: { ms: druation }
    },
    {
      action: 'moveTo',
      options: {
        x: x2,
        y: y2
      }
    },
    {
      action: 'wait',
      options: { ms: 280 }
    },
    {
      action: 'release'
    }
  ];
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
  const randomX = (Math.random() * rand) >>> 0;
  return val + randomX;
}

exports.tap = tap;
exports.wait = wait;
exports.drag = drag;
exports.longPress = longPress;

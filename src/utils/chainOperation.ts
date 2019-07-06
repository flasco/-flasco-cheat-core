export type IChainOperation = ITap | IPress | IMoveTo | ILongPress | IRelease | IWait;

interface ITap {
  action: 'tap';
  options: {
    x: number;
    y: number;
  };
}

interface IPress {
  action: 'press';
  options: {
    x: number;
    y: number;
  };
}

interface IMoveTo {
  action: 'moveTo';
  options: {
    x: number;
    y: number;
  };
}

interface IWait {
  action: 'wait';
  options: {
    ms: number;
  };
}

interface ILongPress {
  action: 'longPress';
  options: {
    x: number;
    y: number;
    duration: number;
  };
}

interface IRelease {
  action: 'release';
}

/**
 * 长按
 * @param x x坐标
 * @param y y坐标
 * @param druation 持续时间
 * @param rand 随机值
 */
export function longPress(
  x: number,
  y: number,
  duration: number,
  rand = 0
): [IPress, IWait, IRelease] {
  x = getRandom(x, rand);
  y = getRandom(y, rand);
  return [
    {
      action: 'press',
      options: {
        x,
        y,
      },
    },
    {
      action: 'wait',
      options: {
        ms: duration,
      },
    },
    { action: 'release' },
  ];
}

/**
 * 等待
 * @param ms 毫秒
 */
export function wait(ms: number): IWait {
  return {
    action: 'wait',
    options: { ms },
  };
}

type pointArr = [number, number];

/**
 * 从起点拖拽至终点
 * @param param0 起点
 * @param param1 终点
 * @param druation 拖拽的持续时间
 */
export function drag(
  [x1, y1]: pointArr,
  [x2, y2]: pointArr,
  duration = 800,
  rand = 0
): [ILongPress, IMoveTo, IWait, IRelease] {
  x1 = getRandom(x1, rand);
  x2 = getRandom(x2, rand);
  y1 = getRandom(y1, rand);
  y2 = getRandom(y2, rand);

  return [
    {
      action: 'longPress',
      options: {
        x: x1,
        y: y1,
        duration,
      },
    },
    {
      action: 'moveTo',
      options: {
        x: x2,
        y: y2,
      },
    },
    {
      action: 'wait',
      options: { ms: 280 },
    },
    {
      action: 'release',
    },
  ];
}

/**
 * 点击
 * @param x x坐标
 * @param y y坐标
 * @param rand 随机值
 */
export function tap(x: number, y: number, rand = 0): ITap {
  x = getRandom(x, rand);
  y = getRandom(y, rand);
  return {
    action: 'tap',
    options: {
      x,
      y,
    },
  };
}

function getRandom(val: number, rand: number) {
  const randomX = (Math.random() * rand) | 0;
  return val + randomX;
}

declare module '@flasco/cheat-core/src/utils/chainOperation' {
  namespace actionInf {
    interface press {
      action: 'press';
      options: {
        x: number;
        y: number;
      };
    }

    interface moveTo {
      action: 'moveTo';
      options: {
        x: number;
        y: number;
      };
    }

    interface tap {
      action: 'tap';
      options: {
        x: number;
        y: number;
      };
    }

    interface wait {
      action: 'wait';
      options: {
        ms: number;
      };
    }

    interface release {
      action: 'release';
    }
  }
  namespace chainOperation {
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
      druation: number,
      rand?: number
    ): [actionInf.press, actionInf.wait, actionInf.release];

    /**
     * 等待
     * @param ms 毫秒
     */
    export function wait(ms: number): actionInf.wait;

    /**
     * 从起点拖拽至终点
     * @param param0 起点
     * @param param1 终点
     * @param druation 拖拽的持续时间
     */
    export function drag(
      [x1, y1]: Array<number>,
      [x2, y2]: Array<number>,
      druation: number,
      rand?: number
    ): [
      actionInf.press,
      actionInf.wait,
      actionInf.moveTo,
      actionInf.wait,
      actionInf.release
    ];

    /**
     * 点击
     * @param x x坐标
     * @param y y坐标
     * @param rand 随机值
     */
    export function tap(x: number, y: number, rand?: number): actionInf.tap;
  }

  export = chainOperation;
}

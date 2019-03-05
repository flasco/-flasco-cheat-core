declare module '@flasco/cheat-core/src/utils/chainOperation' {
  namespace chainOperation {
    namespace actionInf {
      interface press {
        action: 'press';
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
      rand: number
    ): [actionInf.press, actionInf.wait, actionInf.release];

    /**
     * 等待
     * @param ms 毫秒
     */
    export function wait(ms: number): actionInf.wait;

    /**
     * 点击
     * @param x x坐标
     * @param y y坐标
     * @param rand 随机值
     */
    export function tap(x: number, y: number, rand: number): actionInf.tap;
  }

  export = chainOperation;
}

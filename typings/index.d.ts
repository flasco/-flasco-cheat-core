/// <reference types="node" />

/// <reference path="./constants/index.d.ts" />
/// <reference path="./utils/index.d.ts" />
/// <reference path="./utils/chainOperation.d.ts" />
/// <reference path="./core/flag-pool.d.ts" />
/// <reference path="./core/base/index.d.ts" />
/// <reference path="./core/base-game/index.d.ts" />

declare module '@flasco/cheat-core' {
  import { LEVEL_INFO_MAP } from '@flasco/cheat-core/constants';
  import { delay, base642Mat } from '@flasco/cheat-core/utils';
  import { tap, longPress, wait } from '@flasco/cheat-core/utils/chainOperation';

  declare const chainOperation = {
    tap,
    longPress,
    wait
  };

  export { LEVEL_INFO_MAP, delay, base642Mat, chainOperation };
}

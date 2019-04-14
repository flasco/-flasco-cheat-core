/// <reference types="node" />

/// <reference path="./utils/index.d.ts" />
/// <reference path="./utils/chainOperation.d.ts" />
/// <reference path="./core/base/index.d.ts" />
/// <reference path="./core/base-game/index.d.ts" />
/// <reference path="./core/base-judge/index.d.ts" />
/// <reference path="./core/flag-pool.d.ts" />

declare module '@flasco/cheat-core' {
  import Judge = require('@flasco/cheat-core/src/core/base-judge');
  import { default as chainOperation } from '@flasco/cheat-core/src/utils/chainOperation';

  export { Judge, chainOperation };
  export * from '@flasco/cheat-core/src/utils';
}

/// <reference types="node" />

/// <reference path="./utils/index.d.ts" />
/// <reference path="./utils/chainOperation.d.ts" />
/// <reference path="./core/base/index.d.ts" />
/// <reference path="./core/base-game/index.d.ts" />
/// <reference path="./core/flag-pool.d.ts" />
/// <reference path="./core/base-judge.d.ts" />

declare module '@flasco/cheat-core' {
  export * from '@flasco/cheat-core/src/utils';
  export * from '@flasco/cheat-core/src/core/base-judge';
  export { default as chainOperation } from '@flasco/cheat-core/src/utils/chainOperation';
}

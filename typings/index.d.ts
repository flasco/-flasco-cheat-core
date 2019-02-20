/// <reference types="node" />

/// <reference path="./constants/index.d.ts" />
/// <reference path="./utils/index.d.ts" />
/// <reference path="./utils/chainOperation.d.ts" />

declare module '@flasco/cheat-core' {
  export { LEVEL_INFO_MAP } from '@flasco/cheat-core/src/constants';
  export * from '@flasco/cheat-core/src/utils';
  export { default as chainOperation } from '@flasco/cheat-core/src/utils/chainOperation';
}

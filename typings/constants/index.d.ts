declare module '@flasco/cheat-core/src/constants' {
  import { Color } from 'colors-cli';

  export const LEVEL_INFO_MAP = {
    info: Symbol('info'),
    success: Symbol('success'),
    warn: Symbol('warn'),
    error: Symbol('error'),
  }

  export const TIP_COLOR = {
    [LEVEL_INFO_MAP.info]: Color['blue'],
    [LEVEL_INFO_MAP.success]: Color['green'],
    [LEVEL_INFO_MAP.warn]: Color['yellow_bt'],
    [LEVEL_INFO_MAP.error]: Color['red_bt'],
  }

  export interface TIP_TEXT {
    [LEVEL_INFO_MAP.info]: 'info';
    [LEVEL_INFO_MAP.success]: 'success';
    [LEVEL_INFO_MAP.warn]: 'warn';
    [LEVEL_INFO_MAP.error]: 'error';
  }
}

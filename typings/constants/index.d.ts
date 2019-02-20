declare module '@flasco/cheat-core/src/constants' {
  import { Color } from 'colors-cli';

  const info: unique symbol;
  const success: unique symbol;
  const warn: unique symbol;
  const error: unique symbol;

  export interface LEVEL_INFO_MAP {
    info: typeof info;
    success: typeof success;
    warn: typeof warn;
    error: typeof error;
  }

  export interface TIP_COLOR {
    [info]: Color['blue'];
    [success]: Color['green'];
    [warn]: Color['yellow_bt'];
    [error]: Color['red_bt'];
  }

  export interface TIP_TEXT {
    [info]: 'info';
    [success]: 'success';
    [warn]: 'warn';
    [error]: 'error';
  }
}

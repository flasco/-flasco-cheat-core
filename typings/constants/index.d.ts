import { Color } from 'colors-cli';

declare const info: unique symbol;
declare const success: unique symbol;
declare const warn: unique symbol;
declare const error: unique symbol;

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

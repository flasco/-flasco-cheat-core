export declare type IChainOperation = ITap | IPress | IMoveTo | ILongPress | IRelease | IWait;
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
export declare function longPress(x: number, y: number, duration: number, rand?: number): [IPress, IWait, IRelease];
export declare function wait(ms: number): IWait;
declare type pointArr = [number, number];
export declare function drag([x1, y1]: pointArr, [x2, y2]: pointArr, duration?: number, rand?: number): [ILongPress, IMoveTo, IWait, IRelease];
export declare function tap(x: number, y: number, rand?: number): ITap;
export {};

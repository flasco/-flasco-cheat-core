"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function longPress(x, y, duration, rand = 0) {
    x = getRandom(x, rand);
    y = getRandom(y, rand);
    return [
        {
            action: 'press',
            options: {
                x,
                y,
            },
        },
        {
            action: 'wait',
            options: {
                ms: duration,
            },
        },
        { action: 'release' },
    ];
}
exports.longPress = longPress;
function wait(ms) {
    return {
        action: 'wait',
        options: { ms },
    };
}
exports.wait = wait;
function drag([x1, y1], [x2, y2], duration = 800, rand = 0) {
    x1 = getRandom(x1, rand);
    x2 = getRandom(x2, rand);
    y1 = getRandom(y1, rand);
    y2 = getRandom(y2, rand);
    return [
        {
            action: 'longPress',
            options: {
                x: x1,
                y: y1,
                duration,
            },
        },
        {
            action: 'moveTo',
            options: {
                x: x2,
                y: y2,
            },
        },
        {
            action: 'wait',
            options: { ms: 280 },
        },
        {
            action: 'release',
        },
    ];
}
exports.drag = drag;
function tap(x, y, rand = 0) {
    x = getRandom(x, rand);
    y = getRandom(y, rand);
    return {
        action: 'tap',
        options: {
            x,
            y,
        },
    };
}
exports.tap = tap;
function getRandom(val, rand) {
    const randomX = (Math.random() * rand) | 0;
    return val + randomX;
}
//# sourceMappingURL=chainOperation.js.map
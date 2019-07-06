"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("@flasco/logger"));
const utils_1 = require("../../utils");
const flag_pool_1 = tslib_1.__importDefault(require("../flag-pool"));
const base_judge_1 = tslib_1.__importDefault(require("../base-judge"));
class BaseApp {
    constructor(props) {
        const { client, session, width, height, scale = 3 } = props;
        this.client = client;
        this.session = session;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.init && this.init(props);
    }
    async tap(x, y, needRandom = false, randX, randY) {
        if (randX == null) {
            randX = 5;
            randY = 5;
        }
        if (randY == null) {
            randY = randX;
        }
        if (needRandom) {
            x += Math.random() * randX;
            y += Math.random() * randY;
        }
        x = Math.round(x * 100) / 100;
        y = Math.round(y * 100) / 100;
        try {
            await this.session.tap(x, y);
        }
        catch (error) {
            throw new Error('啊哦，断掉了');
        }
    }
    async chainOperation(actions) {
        try {
            await this.session.chainOperation(actions);
        }
        catch (error) {
            throw new Error('啊哦，断掉了');
        }
    }
    async drag(x1, y1, x2, y2, duration = 0.7) {
        try {
            await this.session.swipe(x1, y1, x2, y2, duration);
        }
        catch (error) {
            throw new Error('啊哦，断掉了');
        }
    }
    async tapHold(x, y, delay = 1.0) {
        x = Math.round(x * 100) / 100;
        y = Math.round(y * 100) / 100;
        try {
            await this.session.tapHold(x, y, delay);
        }
        catch (error) {
            throw new Error('啊哦，断掉了');
        }
    }
    async screenshot(pathName = '', needMat = true) {
        try {
            pathName !== '' && logger_1.default.info('screenshot! pathName -', pathName);
            const binary = await this.client.screenshot(pathName);
            if (needMat && binary != null)
                return utils_1.binary2Mat(binary);
            return binary;
        }
        catch (error) {
            throw new Error('啊哦，断掉了');
        }
    }
    judgeMatching(img1, img2, needLog = false) {
        if (img1 == null || img2 == null)
            throw new Error('图像不能为空！');
        if (typeof img1 === 'string')
            img1 = this.getPicture(img1);
        if (typeof img2 === 'string')
            img2 = this.getPicture(img2);
        const result = new base_judge_1.default(img1, this.scale).matchTemplate(img2);
        needLog && logger_1.default.info(`maxSimple - ${result.simple.toFixed(2)}`);
        return result;
    }
    getPicture(filePath, needStore = true) {
        return flag_pool_1.default.getFlag(filePath, needStore);
    }
    judge(img) {
        return new base_judge_1.default(img, this.scale);
    }
    delay(ms) {
        return utils_1.delay(ms);
    }
}
exports.default = BaseApp;
//# sourceMappingURL=index.js.map
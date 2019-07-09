"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("@flasco/logger"));
const chainOperation_1 = require("../../utils/chainOperation");
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
    /**
     * 点击事件
     * @param x x坐标
     * @param y y坐标
     * @param {IRandom} 随机配置项
     */
    async tap(x, y, { needRand = false, randX = 3, randY = 3 }) {
        if (!needRand) {
            randX = 0;
            randY = 0;
        }
        x = utils_1.getRandom(x, randX);
        y = utils_1.getRandom(y, randY);
        try {
            await this.chainOperation([
                {
                    action: 'tap',
                    options: {
                        x,
                        y,
                    },
                },
            ]);
        }
        catch (error) {
            throw new Error('啊哦，断掉了');
        }
    }
    /**
     * 执行动作链
     * @param actions 动作链
     */
    async chainOperation(actions) {
        try {
            await this.session.chainOperation(actions);
        }
        catch (error) {
            throw new Error('啊哦，断掉了');
        }
    }
    /**
     * 拖拽
     * @param x1 前坐标x
     * @param y1 前坐标y
     * @param x2 后坐标x
     * @param y2 后坐标y
     * @param duration 耗时，毫秒为单位
     */
    async drag(x1, y1, x2, y2, duration = 700) {
        try {
            await this.chainOperation(chainOperation_1.drag([x1, y1], [x2, y2], duration));
        }
        catch (error) {
            throw new Error('啊哦，断掉了');
        }
    }
    /**
     * 长按
     * @param x x坐标
     * @param y y坐标
     * @param duration 持续时间，毫秒
     * @param {IRandom} 随机配置项
     */
    async tapHold(x, y, duration = 800, { needRand = false, randX = 3, randY = 3 }) {
        if (!needRand) {
            randX = 0;
            randY = 0;
        }
        x = utils_1.getRandom(x, randX);
        y = utils_1.getRandom(y, randY);
        try {
            await this.chainOperation(chainOperation_1.longPress(x, y, duration));
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
    /**
     * 在父图片中查找子图片，获取相似度与起始坐标
     * @param img1 子图片
     * @param img2 父图片
     * @param  needLog 是否需要打印日志，调试用
     */
    judgeMatching(img1, img2, needLog = false) {
        if (img1 == null || img2 == null)
            throw new Error('图像不能为空！');
        if (typeof img1 === 'string')
            img1 = this.getPicture(img1);
        if (typeof img2 === 'string')
            img2 = this.getPicture(img2);
        const result = new base_judge_1.default(img1, this.scale).matchTemplate(img2);
        needLog && logger_1.default.info(`maxSimple - ${result.simple.toFixed(2)}`);
        // 之所以返回除以3，是因为屏幕缩放倍数的原因
        return result;
    }
    /**
     * 获取pic Mat
     * @param filePath 图片文件路径
     * @param needStore 是否需要存储，默认为 true
     */
    getPicture(filePath, needStore = true) {
        return flag_pool_1.default.getFlag(filePath, needStore);
    }
    /**
     * 获取judge
     * @param img 图片
     */
    judge(img) {
        return new base_judge_1.default(img, this.scale);
    }
    /**
     * 等待
     * @param ms 毫秒
     */
    delay(ms) {
        return utils_1.delay(ms);
    }
}
exports.default = BaseApp;
//# sourceMappingURL=index.js.map
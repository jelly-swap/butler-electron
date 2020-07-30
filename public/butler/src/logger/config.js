"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleFormat = exports.fileFormat = exports.Config = void 0;
const winston_1 = require("winston");
exports.Config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
        custom: 7,
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'green',
        info: 'grey',
        verbose: 'cyan',
        silly: 'magenta',
        custom: 'yellow',
    },
};
winston_1.addColors(exports.Config.colors);
const baseFormat = [
    winston_1.format.json(),
    winston_1.format.timestamp(),
    winston_1.format.align(),
    winston_1.format.printf((log) => `${new Date(log.timestamp).toLocaleString()} ${log.level}: ${log.message}`),
];
exports.fileFormat = winston_1.format.combine(...baseFormat);
exports.consoleFormat = winston_1.format.combine(winston_1.format.colorize(), ...baseFormat);
//# sourceMappingURL=config.js.map
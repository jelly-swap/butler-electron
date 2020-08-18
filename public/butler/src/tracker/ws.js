"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const ws_1 = __importDefault(require("ws"));
const emitter_1 = __importDefault(require("../emitter"));
const logger_1 = require("../logger");
let ws = null;
exports.subscribe = (url) => {
    if (!ws) {
        ws = new ws_1.default(`wss://${url}/subscribe`);
        ws.onopen = () => {
            logger_1.logDebug('WS_OPENED');
        };
        ws.on('error', (err) => {
            logger_1.logDebug(`WS_ERROR ${err}`);
        });
        ws.onmessage = (event) => {
            logger_1.logDebug(`WS_EVENT: `, event.data);
            new emitter_1.default().emit('WS_EVENT', event.data);
        };
        ws.onclose = () => {
            logger_1.logDebug('WS_OPENED');
            ws = null;
            setTimeout(() => {
                exports.subscribe(url);
            }, 5000);
        };
    }
};
//# sourceMappingURL=ws.js.map
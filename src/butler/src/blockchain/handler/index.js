"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const swap_1 = require("./swap");
const withdraw_1 = require("./withdraw");
const emitter_1 = require("../../emitter");
const refund_1 = require("./refund");
const MINUTES_10 = 10 * 1000 * 60;
exports.startHandlers = () => __awaiter(void 0, void 0, void 0, function* () {
    const emitter = new emitter_1.default();
    const swapHandler = new swap_1.default();
    const withdrawHandler = new withdraw_1.default();
    const refundHandler = new refund_1.default();
    emitter.on('NEW_CONTRACT', (swap) => __awaiter(void 0, void 0, void 0, function* () { return yield swapHandler.onSwap(swap); }));
    emitter.on('WITHDRAW', (withdraw) => __awaiter(void 0, void 0, void 0, function* () { return yield withdrawHandler.onWithdraw(withdraw); }));
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        yield swapHandler.processOldSwaps();
    }), MINUTES_10);
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        yield withdrawHandler.processOldWithdraws();
    }), MINUTES_10);
    yield refundHandler.processRefunds();
});
//# sourceMappingURL=index.js.map
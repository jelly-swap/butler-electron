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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startHandlers = void 0;
const swap_1 = __importDefault(require("./swap"));
const withdraw_1 = __importDefault(require("./withdraw"));
const emitter_1 = __importDefault(require("../../emitter"));
const refund_1 = __importDefault(require("./refund"));
exports.startHandlers = () => __awaiter(void 0, void 0, void 0, function* () {
    const emitter = new emitter_1.default();
    const swapHandler = new swap_1.default();
    const withdrawHandler = new withdraw_1.default();
    const refundHandler = new refund_1.default();
    emitter.on('NEW_CONTRACT', (swap) => __awaiter(void 0, void 0, void 0, function* () { return yield swapHandler.onSwap(swap); }));
    emitter.on('WITHDRAW', (withdraw) => __awaiter(void 0, void 0, void 0, function* () { return yield withdrawHandler.onWithdraw(withdraw); }));
    emitter.on('PROCESS_PAST_SWAPS', ({ activeSwaps, withdraws, expiredSwaps }) => __awaiter(void 0, void 0, void 0, function* () {
        yield swapHandler.processOldSwaps(activeSwaps);
        yield withdrawHandler.processOldWithdraws(withdraws);
        yield refundHandler.processRefunds(expiredSwaps);
    }));
});

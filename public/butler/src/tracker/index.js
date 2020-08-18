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
const moment_1 = __importDefault(require("moment"));
const service_1 = require("./service");
const ws_1 = require("./ws");
const emitter_1 = __importDefault(require("../emitter"));
const utils_1 = require("../utils");
const config_1 = __importDefault(require("../blockchain/config"));
exports.default = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const { WALLETS, TRACKER_URL } = config;
    const MINUTES_15 = 15 * 1000 * 60;
    const lpAddresses = getLpAddresses(WALLETS);
    yield processPastEvents(lpAddresses, WALLETS, TRACKER_URL);
    setInterval(() => {
        processPastEvents(lpAddresses, WALLETS, TRACKER_URL);
    }, MINUTES_15);
    handleMessage(WALLETS);
    ws_1.subscribe(TRACKER_URL);
});
const SWAP_STATUSES = {
    ACTIVE_STATUS: 1,
    WITHDRAWN_STATUS: 3,
    EXPIRED_STATUS: 4,
};
const processPastEvents = (lpAddresses, wallets, url) => __awaiter(void 0, void 0, void 0, function* () {
    const past5Days = moment_1.default().subtract(5, 'days').unix();
    const fetchedWithdraws = yield service_1.fetchWithdraws(url, lpAddresses, past5Days);
    const withdraws = getWithdraws(fetchedWithdraws, wallets);
    const fetchedSwaps = yield service_1.fetchSwaps(url, lpAddresses, past5Days);
    const activeSwaps = getActiveSwaps(fetchedSwaps, wallets);
    const fetchedExpiredSwaps = yield service_1.fetchExpiredSwaps(url, lpAddresses);
    const expiredSwaps = getExpiredSwaps(fetchedExpiredSwaps, wallets);
    new emitter_1.default().emit('PROCESS_PAST_SWAPS', { withdraws, activeSwaps, expiredSwaps });
});
const handleMessage = (wallets) => {
    new emitter_1.default().on('WS_EVENT', (message) => {
        var _a, _b;
        const { topic, data } = JSON.parse(message);
        switch (topic) {
            case 'Swap': {
                const { receiver, network } = data;
                const lpAddress = (_a = wallets[network]) === null || _a === void 0 ? void 0 : _a.ADDRESS;
                if (lpAddress && utils_1.cmpIgnoreCase(lpAddress, receiver)) {
                    new emitter_1.default().emit('NEW_CONTRACT', data);
                }
                break;
            }
            case 'Withdraw': {
                const { sender, network } = data;
                const lpAddress = (_b = wallets[network]) === null || _b === void 0 ? void 0 : _b.ADDRESS;
                if (lpAddress && utils_1.cmpIgnoreCase(lpAddress, sender)) {
                    new emitter_1.default().emit('WITHDRAW', data);
                }
                break;
            }
            default:
                break;
        }
    });
};
const getWithdraws = (withdraws, wallets) => {
    return withdraws.filter(({ sender, network }) => { var _a; return utils_1.cmpIgnoreCase(sender, (_a = wallets[network]) === null || _a === void 0 ? void 0 : _a.ADDRESS); });
};
const getExpiredSwaps = (swaps, wallets) => {
    return swaps.filter(({ sender, network }) => { var _a; return utils_1.cmpIgnoreCase(sender, (_a = wallets[network]) === null || _a === void 0 ? void 0 : _a.ADDRESS); });
};
const getActiveSwaps = (swaps, wallets) => {
    const last12Hours = moment_1.default().subtract(12, 'hours').unix();
    const config = config_1.default();
    return swaps.reduce((p, c) => {
        var _a;
        const { receiver, network, status, expiration } = c;
        const lpAddress = (_a = wallets[network]) === null || _a === void 0 ? void 0 : _a.ADDRESS;
        if (lpAddress && config[network]) {
            if (status === SWAP_STATUSES.ACTIVE_STATUS) {
                if (utils_1.cmpIgnoreCase(receiver, lpAddress)) {
                    const fixedExpiration = config[network].unix ? expiration : expiration / 1000;
                    if (fixedExpiration > last12Hours) {
                        p.push(c);
                    }
                }
            }
        }
        return p;
    }, []);
};
const getLpAddresses = (wallets) => {
    return Object.keys(wallets)
        .map((wallet) => wallets[wallet].ADDRESS)
        .filter(Boolean)
        .join(';');
};
//# sourceMappingURL=index.js.map
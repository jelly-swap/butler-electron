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
exports.fetchWithdraws = exports.fetchExpiredSwaps = exports.fetchSwaps = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../logger");
const fetchSwaps = (url, login, expiration = 1) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (login) {
            const res = yield axios_1.default.get(`https://${url}/api/v1/swaps/receiver/${login}/expiration/${expiration}`);
            return res.data;
        }
        else {
            logger_1.logError('Cannot fetch swaps. This is a bug.');
        }
        return [];
    }
    catch (error) {
        logger_1.logDebug('FETCH_SWAPS_ERROR: ', error);
        return [];
    }
});
exports.fetchSwaps = fetchSwaps;
const fetchExpiredSwaps = (url, login, status = 4) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (login) {
            const res = yield axios_1.default.get(`https://${url}/api/v1/swaps/sender/${login}/status/${status}`);
            return res.data;
        }
        else {
            logger_1.logError('Cannot fetch expired swaps. This is a bug.');
        }
        return [];
    }
    catch (error) {
        logger_1.logDebug('FETCH_EXPIRED_SWAPS_ERROR: ', error);
        return [];
    }
});
exports.fetchExpiredSwaps = fetchExpiredSwaps;
const fetchWithdraws = (url, login, expiration = 1) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (login) {
            const res = yield axios_1.default.get(`https://${url}/api/v1/withdraws/sender/${login}/expiration/${expiration}`);
            return res.data;
        }
        else {
            logger_1.logError('Cannot fetch swaps. This is a bug.');
        }
        return [];
    }
    catch (error) {
        logger_1.logDebug('FETCH_WITHDRAWS_ERROR: ', error);
        return [];
    }
});
exports.fetchWithdraws = fetchWithdraws;

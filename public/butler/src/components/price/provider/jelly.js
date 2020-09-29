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
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../../config"));
class JellyProvider {
    constructor() {
        if (JellyProvider.instance) {
            return JellyProvider.instance;
        }
        this.userConfig = new config_1.default().getUserConfig();
        JellyProvider.instance = this;
    }
    getPrices(__quotes, __bases) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield axios_1.default.get(`${this.userConfig.JELLY_PRICE_PROVIDER}`);
            return result.data.data;
        });
    }
}
exports.default = JellyProvider;

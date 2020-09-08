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
const service_1 = require("./service");
const config_1 = __importDefault(require("../../../config"));
const config_2 = __importDefault(require("../../config"));
class BalanceTask {
    constructor() {
        this.name = 'Balance Task';
        this.balanceService = new service_1.BalanceService();
        this.userConfig = new config_2.default().getUserConfig();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.balanceService.update();
            yield this.balanceService.saveBalanceHistory();
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield this.balanceService.update();
            }), this.userConfig.PRICE.UPDATE_INTERVAL * 1000);
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield this.balanceService.saveBalanceHistory();
            }), config_1.default.BALANCE_SNAPSHOT_INTERVAL * 1000);
        });
    }
}
exports.default = BalanceTask;

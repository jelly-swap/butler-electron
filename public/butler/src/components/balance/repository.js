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
const repository_1 = __importDefault(require("../../repository"));
const utils_1 = require("../../utils");
const logger_1 = require("../../logger");
const config_1 = __importDefault(require("../../config"));
class BalanceRepository {
    constructor() {
        const userConfig = new config_1.default().getUserConfig();
        const getBalanceRepository = utils_1.safeAccess(repository_1.default, [userConfig.DATABASE.ACTIVE, 'balance']);
        if (!getBalanceRepository) {
            throw new Error('BALANCE_REPOSITORY_MISSING');
        }
        else {
            this.balanceRepository = getBalanceRepository();
        }
    }
    saveBalance(balance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.balanceRepository.save(balance);
            }
            catch (error) {
                logger_1.logDebug(`BALANCE_REPOSITORY_ERROR`, error);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.balanceRepository.find();
        });
    }
}
exports.default = BalanceRepository;
//# sourceMappingURL=repository.js.map
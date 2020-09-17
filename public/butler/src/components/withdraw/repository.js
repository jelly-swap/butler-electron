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
const model_1 = require("./model");
const repository_1 = __importDefault(require("../../repository"));
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const config_1 = __importDefault(require("../../config"));
class WithdrawRepository {
    constructor() {
        const userConfig = new config_1.default().getUserConfig();
        const getWithdrawRepository = utils_1.safeAccess(repository_1.default, [userConfig.DATABASE.ACTIVE, 'withdraw']);
        if (!getWithdrawRepository) {
            throw new Error('WITHDRAW_REPOSITORY_MISSING');
        }
        else {
            this.withdrawRepository = getWithdrawRepository();
        }
    }
    create(withdraw) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.withdrawRepository.save(new model_1.WithdrawModel(withdraw.id, withdraw.hashLock, withdraw.secret, withdraw.transactionHash, withdraw.sender, withdraw.receiver, withdraw.network));
            }
            catch (error) {
                logger_1.logDebug(`WITHDRAW_REPOSITORY_ERROR`, error);
            }
        });
    }
    findByIdAndNetwork(id, network) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.withdrawRepository.findOne({ id, network });
        });
    }
}
exports.default = WithdrawRepository;

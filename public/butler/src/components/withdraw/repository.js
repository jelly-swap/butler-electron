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
const repository_1 = require("../../repository");
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const config_1 = require("../../config");
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
                yield this.withdrawRepository.save(withdraw);
            }
            catch (error) {
                logger_1.logError(`WITHDRAW_REPOSITORY_ERROR`, error);
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
//# sourceMappingURL=repository.js.map
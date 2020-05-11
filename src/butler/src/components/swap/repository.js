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
class SwapRepository {
    constructor() {
        const userConfig = new config_1.default().getUserConfig();
        const getSwapRepository = utils_1.safeAccess(repository_1.default, [userConfig.DATABASE.ACTIVE, 'swap']);
        if (!getSwapRepository) {
            throw new Error('SWAP_REPOSITORY_MISSING');
        }
        else {
            this.swapRepository = getSwapRepository();
        }
    }
    create(swap) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.swapRepository.save(swap);
            }
            catch (error) {
                logger_1.logError(`Error while saving the Swap: ${error}`);
            }
        });
    }
    findByIdAndNetwork(id, network) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.swapRepository.findOne({ id, network });
        });
    }
    findInputSwapByOutputSwapIdAndOutputNetwork(outputSwapId, outputNetwork) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.swapRepository.findOne({ outputSwapId, outputNetwork });
        });
    }
}
exports.default = SwapRepository;
//# sourceMappingURL=repository.js.map
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
const contracts_1 = require("../contracts");
const config_1 = require("../config");
class RefundHandler {
    processRefunds() {
        return __awaiter(this, void 0, void 0, function* () {
            const contracts = contracts_1.default();
            for (const network in contracts) {
                if (!config_1.SECONDARY_NETWORKS[network]) {
                    yield contracts[network].processRefunds();
                }
            }
        });
    }
}
exports.default = RefundHandler;
//# sourceMappingURL=refund.js.map
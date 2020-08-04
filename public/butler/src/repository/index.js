"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const swap_1 = __importDefault(require("../entity/sql/swap"));
const swap_2 = __importDefault(require("../entity/mongo/swap"));
const withdraw_1 = __importDefault(require("../entity/sql/withdraw"));
const withdraw_2 = __importDefault(require("../entity/mongo/withdraw"));
const refund_1 = __importDefault(require("../entity/sql/refund"));
const refund_2 = __importDefault(require("../entity/mongo/refund"));
const balance_1 = __importDefault(require("../entity/sql/balance"));
const balance_2 = __importDefault(require("../entity/mongo/balance"));
exports.default = {
    MONGODB: {
        swap: () => typeorm_1.getMongoRepository(swap_2.default),
        withdraw: () => typeorm_1.getMongoRepository(withdraw_2.default),
        refund: () => typeorm_1.getMongoRepository(refund_2.default),
        balance: () => typeorm_1.getMongoRepository(balance_2.default),
    },
    SQLITE: {
        swap: () => typeorm_1.getRepository(swap_1.default),
        withdraw: () => typeorm_1.getRepository(withdraw_1.default),
        refund: () => typeorm_1.getRepository(refund_1.default),
        balance: () => typeorm_1.getRepository(balance_1.default),
    },
};
//# sourceMappingURL=index.js.map
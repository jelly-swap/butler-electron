"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_config_testnet_1 = __importDefault(require("./user-config-testnet"));
const user_config_mainnet_1 = __importDefault(require("./user-config-mainnet"));
exports.default = process.env.NETWORK === 'testnet' ? user_config_testnet_1.default : user_config_mainnet_1.default;
//# sourceMappingURL=user-config.js.map
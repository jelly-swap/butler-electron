"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BitcoinValidator = require("./bitcoin/validator");
const EthereumValidator = require("./ethereum/validator");
const AeternityValidator = require("./aeternity/validator");
const Erc20Validator = require("./erc20/validator");
exports.default = {
    BTC: BitcoinValidator,
    ETH: EthereumValidator,
    AE: AeternityValidator,
    DAI: Erc20Validator,
    WBTC: Erc20Validator,
    USDC: Erc20Validator,
};
//# sourceMappingURL=validators.js.map
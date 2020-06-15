"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BitcoinValidator = require("./bitcoin/validator");
const EthereumValidator = require("./ethereum/validator");
const AeternityValidator = require("./aeternity/validator");
const Erc20Validator = require("./erc20/validator");
const config_1 = require("./config");
const getErc20Validators = () => {
    return Object.keys(config_1.SECONDARY_NETWORKS).reduce((object, token) => {
        object[token] = Erc20Validator;
        return object;
    }, {});
};
exports.default = Object.assign({ BTC: BitcoinValidator, ETH: EthereumValidator, AE: AeternityValidator }, getErc20Validators());
//# sourceMappingURL=validators.js.map
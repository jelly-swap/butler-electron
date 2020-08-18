"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const harmony_1 = require("@jelly-swap/harmony");
const providers_1 = require("@jelly-swap/harmony/dist/src/providers");
class EthereumContract extends harmony_1.Contract {
    constructor(config) {
        const _wallet = new providers_1.WalletProvider(config.providerUrl, config.PRIVATE_KEY);
        super(_wallet, config);
        this.wallet = _wallet;
    }
}
exports.default = EthereumContract;
//# sourceMappingURL=index.js.map
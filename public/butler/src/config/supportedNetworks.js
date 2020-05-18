"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
exports.default = () => {
    const userConfig = new _1.default().getUserConfig();
    const pairs = userConfig.PAIRS;
    return Object.keys(pairs).reduce((result, pair) => {
        const base = pair.split('-')[0];
        const quote = pair.split('-')[1];
        if (base && quote) {
            if (!result[base]) {
                result[base] = true;
            }
            if (!result[quote]) {
                result[quote] = true;
            }
        }
        return result;
    }, {});
};
//# sourceMappingURL=supportedNetworks.js.map
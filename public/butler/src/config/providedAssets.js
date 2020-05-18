"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
exports.default = () => {
    const userConfig = new _1.default().getUserConfig();
    const pairs = userConfig.PAIRS;
    return Object.keys(pairs).reduce((result, pair) => {
        const asset = pair.split('-')[1];
        if (asset) {
            if (!result[asset]) {
                result[asset] = true;
            }
        }
        return result;
    }, {});
};
//# sourceMappingURL=providedAssets.js.map
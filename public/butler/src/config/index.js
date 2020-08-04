"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_config_1 = __importDefault(require("../../user-config"));
const utils_1 = require("../utils");
class UserConfig {
    constructor() {
        if (UserConfig.instance) {
            return UserConfig.instance;
        }
        this.config = user_config_1.default;
        UserConfig.instance = this;
    }
    setUserConfig(config) {
        this.config = config;
    }
    getUserConfig() {
        return this.config;
    }
    getReceivers(assets) {
        const wallets = utils_1.safeAccess(this.config, ['WALLETS']);
        return assets.reduce((p, c) => {
            if (wallets[c]) {
                const receiver = wallets[c].ADDRESS;
                if (receiver) {
                    p.push(receiver);
                }
            }
            return p;
        }, []);
    }
}
exports.default = UserConfig;
//# sourceMappingURL=index.js.map
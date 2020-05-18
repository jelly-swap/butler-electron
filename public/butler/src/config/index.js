"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_config_1 = require("../../user-config");
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
}
exports.default = UserConfig;
//# sourceMappingURL=index.js.map
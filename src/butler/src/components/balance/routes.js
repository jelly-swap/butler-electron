"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
exports.default = [
    {
        method: 'get',
        route: '/api/v1/balance',
        controller: controller_1.BalanceController,
        action: 'getBalances',
    },
];
//# sourceMappingURL=routes.js.map
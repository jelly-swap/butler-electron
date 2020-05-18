"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
exports.default = [
    {
        method: 'post',
        route: '/api/v1/withdraw',
        controller: controller_1.WithdrawController,
        action: 'withdraw',
    },
];
//# sourceMappingURL=routes.js.map
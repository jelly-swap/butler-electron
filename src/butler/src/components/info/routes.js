"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
exports.default = [
    {
        method: 'get',
        route: '/api/v1/info',
        controller: controller_1.InfoController,
        action: 'getInfo',
    },
];
//# sourceMappingURL=routes.js.map
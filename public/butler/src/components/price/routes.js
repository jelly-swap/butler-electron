"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
exports.default = [
    {
        method: 'get',
        route: '/api/v1/price',
        controller: controller_1.PriceController,
        action: 'getPrice',
    },
];

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const routes_1 = __importDefault(require("../components/price/routes"));
const routes_2 = __importDefault(require("../components/balance/routes"));
const routes_3 = __importDefault(require("../components/info/routes"));
const routes_4 = __importDefault(require("../components/withdraw/routes"));
exports.Routes = [...routes_1.default, ...routes_2.default, ...routes_3.default, ...routes_4.default];

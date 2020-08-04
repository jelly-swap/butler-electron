"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.divDecimals = exports.toBigNumber = exports.toFixed = exports.equal = exports.lessThanOrEqual = exports.greaterThan = exports.round = exports.sqrt = exports.pow = exports.div = exports.mulDecimals = exports.mul = exports.sub = exports.addBig = exports.add = void 0;
const big_js_1 = __importDefault(require("big.js"));
exports.add = (a, b) => {
    return big_js_1.default(a).add(b).toString();
};
exports.addBig = (a, b) => {
    return big_js_1.default(a).add(b);
};
exports.sub = (a, b) => {
    return big_js_1.default(a).sub(b).toString();
};
exports.mul = (a, b) => {
    return big_js_1.default(a).times(b).toString();
};
exports.mulDecimals = (a, b) => {
    return exports.mul(a, exports.pow(10, b));
};
exports.div = (a, b) => {
    return big_js_1.default(a).div(b);
};
exports.pow = (a, b) => {
    return big_js_1.default(a).pow(b);
};
exports.sqrt = (a) => {
    return big_js_1.default(a).sqrt();
};
exports.round = (a, precision) => {
    return big_js_1.default(a).round(precision);
};
exports.greaterThan = (a, b) => {
    return big_js_1.default(a).gt(b);
};
exports.lessThanOrEqual = (a, b) => {
    return big_js_1.default(a).lte(b);
};
exports.equal = (a, b) => {
    return big_js_1.default(a).eq(b);
};
exports.toFixed = (a, precision) => {
    return big_js_1.default(a).toFixed(precision);
};
exports.toBigNumber = (a) => {
    return big_js_1.default(a);
};
exports.divDecimals = (a, b) => {
    return exports.div(a, exports.pow(10, b));
};
//# sourceMappingURL=math.js.map
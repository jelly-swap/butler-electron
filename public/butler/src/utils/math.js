"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.divDecimals = exports.toBigNumber = exports.toFixed = exports.equal = exports.lessThanOrEqual = exports.greaterThan = exports.round = exports.sqrt = exports.pow = exports.div = exports.mulDecimals = exports.mul = exports.sub = exports.addBig = exports.add = void 0;
const big_js_1 = __importDefault(require("big.js"));
const add = (a, b) => {
    return big_js_1.default(a).add(b).toString();
};
exports.add = add;
const addBig = (a, b) => {
    return big_js_1.default(a).add(b);
};
exports.addBig = addBig;
const sub = (a, b) => {
    return big_js_1.default(a).sub(b).toString();
};
exports.sub = sub;
const mul = (a, b) => {
    return big_js_1.default(a).times(b).toString();
};
exports.mul = mul;
const mulDecimals = (a, b) => {
    return exports.mul(a, exports.pow(10, b));
};
exports.mulDecimals = mulDecimals;
const div = (a, b) => {
    return big_js_1.default(a).div(b);
};
exports.div = div;
const pow = (a, b) => {
    return big_js_1.default(a).pow(b);
};
exports.pow = pow;
const sqrt = (a) => {
    return big_js_1.default(a).sqrt();
};
exports.sqrt = sqrt;
const round = (a, precision) => {
    return big_js_1.default(a).round(precision);
};
exports.round = round;
const greaterThan = (a, b) => {
    return big_js_1.default(a).gt(b);
};
exports.greaterThan = greaterThan;
const lessThanOrEqual = (a, b) => {
    return big_js_1.default(a).lte(b);
};
exports.lessThanOrEqual = lessThanOrEqual;
const equal = (a, b) => {
    return big_js_1.default(a).eq(b);
};
exports.equal = equal;
const toFixed = (a, precision) => {
    return big_js_1.default(a).toFixed(precision);
};
exports.toFixed = toFixed;
const toBigNumber = (a) => {
    return big_js_1.default(a);
};
exports.toBigNumber = toBigNumber;
const divDecimals = (a, b) => {
    return exports.div(a, exports.pow(10, b));
};
exports.divDecimals = divDecimals;

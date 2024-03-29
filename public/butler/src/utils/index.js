"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmpIgnoreCase = exports.safeAccess = void 0;
const safeAccess = (object, path) => {
    return object
        ? path.reduce((accumulator, currentValue) => accumulator && accumulator[currentValue] ? accumulator[currentValue] : null, object)
        : null;
};
exports.safeAccess = safeAccess;
const cmpIgnoreCase = (a1, a2) => (a1 === null || a1 === void 0 ? void 0 : a1.toLowerCase()) === (a2 === null || a2 === void 0 ? void 0 : a2.toLowerCase());
exports.cmpIgnoreCase = cmpIgnoreCase;

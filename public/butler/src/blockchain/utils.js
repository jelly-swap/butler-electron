"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareAddress = (a1, a2) => {
    return a1.toLowerCase() === a2.toLowerCase();
};
exports.sleep = (msec) => {
    return new Promise(resolve => setTimeout(resolve, msec));
};
//# sourceMappingURL=utils.js.map
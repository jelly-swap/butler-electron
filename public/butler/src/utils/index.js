"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeAccess = void 0;
exports.safeAccess = (object, path) => {
    return object
        ? path.reduce((accumulator, currentValue) => accumulator && accumulator[currentValue] ? accumulator[currentValue] : null, object)
        : null;
};
//# sourceMappingURL=index.js.map
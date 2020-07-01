"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWithdraw = exports.validateNewContract = void 0;
exports.validateNewContract = (__swap) => __awaiter(void 0, void 0, void 0, function* () {
    return true;
});
exports.validateWithdraw = (__withdraw) => __awaiter(void 0, void 0, void 0, function* () {
    //If the withdraw event is triggered the withdraw is valid, No validation logic is needed
    return true;
});
//# sourceMappingURL=validator.js.map
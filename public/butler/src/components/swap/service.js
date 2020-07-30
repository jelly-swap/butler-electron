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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapService = void 0;
const repository_1 = __importDefault(require("./repository"));
class SwapService {
    constructor() {
        this.swapRepository = new repository_1.default();
    }
    add(outputSwapId, swap) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.swapRepository.create(Object.assign(Object.assign({}, swap), { outputSwapId }));
        });
    }
    findByIdAndNetwork(id, network) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.swapRepository.findByIdAndNetwork(id, network);
        });
    }
    findInputSwapByOutputSwapIdAndOutputNetwork(outputSwapId, outputNetwork) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.swapRepository.findInputSwapByOutputSwapIdAndOutputNetwork(outputSwapId, outputNetwork);
        });
    }
}
exports.SwapService = SwapService;
//# sourceMappingURL=service.js.map
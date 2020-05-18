"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Refund = class Refund {
    constructor(swapId, hashLock, transactionHash, sender, receiver, network) {
        this.swapId = swapId;
        this.hashLock = hashLock;
        this.transactionHash = transactionHash;
        this.sender = sender;
        this.receiver = receiver;
        this.network = network;
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", typeorm_1.ObjectID)
], Refund.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], Refund.prototype, "swapId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Refund.prototype, "hashLock", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Refund.prototype, "transactionHash", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Refund.prototype, "sender", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Refund.prototype, "receiver", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Refund.prototype, "network", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Refund.prototype, "createdAt", void 0);
Refund = __decorate([
    typeorm_1.Entity('refund'),
    __metadata("design:paramtypes", [String, String, String, String, String, String])
], Refund);
exports.default = Refund;
//# sourceMappingURL=refund.js.map
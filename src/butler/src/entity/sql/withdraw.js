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
let Withdraw = class Withdraw {
    constructor(id, hashLock, secret, transactionHash, sender, receiver, network) {
        this.id = id;
        this.hashLock = hashLock;
        this.secret = secret;
        this.transactionHash = transactionHash;
        this.sender = sender;
        this.receiver = receiver;
        this.network = network;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Withdraw.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], Withdraw.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Withdraw.prototype, "hashLock", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Withdraw.prototype, "secret", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Withdraw.prototype, "transactionHash", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Withdraw.prototype, "sender", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Withdraw.prototype, "receiver", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Withdraw.prototype, "network", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Withdraw.prototype, "createdAt", void 0);
Withdraw = __decorate([
    typeorm_1.Entity('withdraw'),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String])
], Withdraw);
exports.default = Withdraw;
//# sourceMappingURL=withdraw.js.map
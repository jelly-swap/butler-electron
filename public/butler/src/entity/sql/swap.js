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
let Swap = class Swap {
    constructor(id, outputSwapId, hashLock, transactionHash, sender, receiver, refundAddress, outputAddress, inputAmount, outputAmount, expiration, network, outputNetwork, expireBlock) {
        this.id = id;
        this.outputSwapId = outputSwapId;
        this.hashLock = hashLock;
        this.transactionHash = transactionHash;
        this.sender = sender;
        this.receiver = receiver;
        this.refundAddress = refundAddress;
        this.outputAddress = outputAddress;
        this.inputAmount = inputAmount;
        this.outputAmount = outputAmount;
        this.expiration = expiration;
        this.network = network;
        this.outputNetwork = outputNetwork;
        this.expireBlock = expireBlock;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Swap.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], Swap.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Swap.prototype, "outputSwapId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Swap.prototype, "hashLock", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Swap.prototype, "transactionHash", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Swap.prototype, "sender", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Swap.prototype, "receiver", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Swap.prototype, "refundAddress", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Swap.prototype, "outputAddress", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Swap.prototype, "inputAmount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Swap.prototype, "outputAmount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Swap.prototype, "expiration", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Swap.prototype, "expireBlock", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Swap.prototype, "network", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Swap.prototype, "outputNetwork", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Swap.prototype, "createdAt", void 0);
Swap = __decorate([
    typeorm_1.Entity('swap'),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, Number, Number, Number, String, String, Number])
], Swap);
exports.default = Swap;

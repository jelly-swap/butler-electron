"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapModel = void 0;
class SwapModel {
    constructor(id, outputSwapId, hashLock, transactionHash, sender, receiver, refundAddress, outputAddress, inputAmount, outputAmount, expiration, network, outputNetwork) {
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
    }
}
exports.SwapModel = SwapModel;

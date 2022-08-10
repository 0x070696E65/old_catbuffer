"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateBondedTransactionBuilder = void 0;
const AggregateTransactionBodyBuilder_1 = require("./AggregateTransactionBodyBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AggregateBondedTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.aggregateTransactionBody = new AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder({ transactionsHash, transactions, cosignatures });
        if (version !== AggregateBondedTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + AggregateBondedTransactionBuilder.VERSION);
        if (type !== AggregateBondedTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + AggregateBondedTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const aggregateTransactionBody = AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, aggregateTransactionBody.size);
        return new AggregateBondedTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            transactionsHash: aggregateTransactionBody.transactionsHash,
            transactions: aggregateTransactionBody.transactions,
            cosignatures: aggregateTransactionBody.cosignatures,
        });
    }
    static createAggregateBondedTransactionBuilder(signature, signerPublicKey, network, fee, deadline, transactionsHash, transactions, cosignatures) {
        const version = AggregateBondedTransactionBuilder.VERSION;
        const type = AggregateBondedTransactionBuilder.ENTITY_TYPE;
        return new AggregateBondedTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            transactionsHash: transactionsHash,
            transactions: transactions,
            cosignatures: cosignatures,
        });
    }
    get transactionsHash() {
        return this.aggregateTransactionBody.transactionsHash;
    }
    get transactions() {
        return this.aggregateTransactionBody.transactions;
    }
    get cosignatures() {
        return this.aggregateTransactionBody.cosignatures;
    }
    get size() {
        let size = super.size;
        size += this.aggregateTransactionBody.size;
        return size;
    }
    get body() {
        return this.aggregateTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const aggregateTransactionBodyBytes = this.aggregateTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionBodyBytes);
        return newArray;
    }
}
exports.AggregateBondedTransactionBuilder = AggregateBondedTransactionBuilder;
AggregateBondedTransactionBuilder.VERSION = 1;
AggregateBondedTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.AGGREGATE_BONDED_TRANSACTION;
//# sourceMappingURL=AggregateBondedTransactionBuilder.js.map
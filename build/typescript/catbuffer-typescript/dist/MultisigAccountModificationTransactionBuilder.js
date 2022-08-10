"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultisigAccountModificationTransactionBuilder = void 0;
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MultisigAccountModificationTransactionBodyBuilder_1 = require("./MultisigAccountModificationTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MultisigAccountModificationTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder({
            minRemovalDelta,
            minApprovalDelta,
            addressAdditions,
            addressDeletions,
        });
        if (version !== MultisigAccountModificationTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                MultisigAccountModificationTransactionBuilder.VERSION);
        if (type !== MultisigAccountModificationTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                MultisigAccountModificationTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const multisigAccountModificationTransactionBody = MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, multisigAccountModificationTransactionBody.size);
        return new MultisigAccountModificationTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            minRemovalDelta: multisigAccountModificationTransactionBody.minRemovalDelta,
            minApprovalDelta: multisigAccountModificationTransactionBody.minApprovalDelta,
            addressAdditions: multisigAccountModificationTransactionBody.addressAdditions,
            addressDeletions: multisigAccountModificationTransactionBody.addressDeletions,
        });
    }
    static createMultisigAccountModificationTransactionBuilder(signature, signerPublicKey, network, fee, deadline, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions) {
        const version = MultisigAccountModificationTransactionBuilder.VERSION;
        const type = MultisigAccountModificationTransactionBuilder.ENTITY_TYPE;
        return new MultisigAccountModificationTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            minRemovalDelta: minRemovalDelta,
            minApprovalDelta: minApprovalDelta,
            addressAdditions: addressAdditions,
            addressDeletions: addressDeletions,
        });
    }
    get minRemovalDelta() {
        return this.multisigAccountModificationTransactionBody.minRemovalDelta;
    }
    get minApprovalDelta() {
        return this.multisigAccountModificationTransactionBody.minApprovalDelta;
    }
    get addressAdditions() {
        return this.multisigAccountModificationTransactionBody.addressAdditions;
    }
    get addressDeletions() {
        return this.multisigAccountModificationTransactionBody.addressDeletions;
    }
    get size() {
        let size = super.size;
        size += this.multisigAccountModificationTransactionBody.size;
        return size;
    }
    get body() {
        return this.multisigAccountModificationTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const multisigAccountModificationTransactionBodyBytes = this.multisigAccountModificationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyBytes);
        return newArray;
    }
}
exports.MultisigAccountModificationTransactionBuilder = MultisigAccountModificationTransactionBuilder;
MultisigAccountModificationTransactionBuilder.VERSION = 1;
MultisigAccountModificationTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.MULTISIG_ACCOUNT_MODIFICATION_TRANSACTION;
//# sourceMappingURL=MultisigAccountModificationTransactionBuilder.js.map
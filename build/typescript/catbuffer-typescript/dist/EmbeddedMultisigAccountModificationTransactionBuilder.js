"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMultisigAccountModificationTransactionBuilder = void 0;
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MultisigAccountModificationTransactionBodyBuilder_1 = require("./MultisigAccountModificationTransactionBodyBuilder");
class EmbeddedMultisigAccountModificationTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions, }) {
        super({ signerPublicKey, version, network, type });
        this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder({
            minRemovalDelta,
            minApprovalDelta,
            addressAdditions,
            addressDeletions,
        });
        if (version !== EmbeddedMultisigAccountModificationTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedMultisigAccountModificationTransactionBuilder.VERSION);
        if (type !== EmbeddedMultisigAccountModificationTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' +
                type +
                ' is invalid. Expected value is ' +
                EmbeddedMultisigAccountModificationTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const multisigAccountModificationTransactionBody = MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, multisigAccountModificationTransactionBody.size);
        return new EmbeddedMultisigAccountModificationTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            minRemovalDelta: multisigAccountModificationTransactionBody.minRemovalDelta,
            minApprovalDelta: multisigAccountModificationTransactionBody.minApprovalDelta,
            addressAdditions: multisigAccountModificationTransactionBody.addressAdditions,
            addressDeletions: multisigAccountModificationTransactionBody.addressDeletions,
        });
    }
    static createEmbeddedMultisigAccountModificationTransactionBuilder(signerPublicKey, network, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions) {
        const version = EmbeddedMultisigAccountModificationTransactionBuilder.VERSION;
        const type = EmbeddedMultisigAccountModificationTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedMultisigAccountModificationTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
exports.EmbeddedMultisigAccountModificationTransactionBuilder = EmbeddedMultisigAccountModificationTransactionBuilder;
EmbeddedMultisigAccountModificationTransactionBuilder.VERSION = 1;
EmbeddedMultisigAccountModificationTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_MULTISIG_ACCOUNT_MODIFICATION_TRANSACTION;
//# sourceMappingURL=EmbeddedMultisigAccountModificationTransactionBuilder.js.map
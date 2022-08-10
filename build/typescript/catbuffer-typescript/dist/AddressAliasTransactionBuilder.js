"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressAliasTransactionBuilder = void 0;
const AddressAliasTransactionBodyBuilder_1 = require("./AddressAliasTransactionBodyBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AddressAliasTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, address, aliasAction, }) {
        super({ signature, signerPublicKey, version, network, type, fee, deadline });
        this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder({ namespaceId, address, aliasAction });
        if (version !== AddressAliasTransactionBuilder.VERSION)
            throw new Error('The provided version value ' + version + ' is invalid. Expected value is ' + AddressAliasTransactionBuilder.VERSION);
        if (type !== AddressAliasTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + AddressAliasTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const addressAliasTransactionBody = AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressAliasTransactionBody.size);
        return new AddressAliasTransactionBuilder({
            signature: superObject.signature,
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            fee: superObject.fee,
            deadline: superObject.deadline,
            namespaceId: addressAliasTransactionBody.namespaceId,
            address: addressAliasTransactionBody.address,
            aliasAction: addressAliasTransactionBody.aliasAction,
        });
    }
    static createAddressAliasTransactionBuilder(signature, signerPublicKey, network, fee, deadline, namespaceId, address, aliasAction) {
        const version = AddressAliasTransactionBuilder.VERSION;
        const type = AddressAliasTransactionBuilder.ENTITY_TYPE;
        return new AddressAliasTransactionBuilder({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            namespaceId: namespaceId,
            address: address,
            aliasAction: aliasAction,
        });
    }
    get namespaceId() {
        return this.addressAliasTransactionBody.namespaceId;
    }
    get address() {
        return this.addressAliasTransactionBody.address;
    }
    get aliasAction() {
        return this.addressAliasTransactionBody.aliasAction;
    }
    get size() {
        let size = super.size;
        size += this.addressAliasTransactionBody.size;
        return size;
    }
    get body() {
        return this.addressAliasTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const addressAliasTransactionBodyBytes = this.addressAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAliasTransactionBodyBytes);
        return newArray;
    }
}
exports.AddressAliasTransactionBuilder = AddressAliasTransactionBuilder;
AddressAliasTransactionBuilder.VERSION = 1;
AddressAliasTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.ADDRESS_ALIAS_TRANSACTION;
//# sourceMappingURL=AddressAliasTransactionBuilder.js.map
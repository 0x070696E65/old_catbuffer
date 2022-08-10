"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAddressAliasTransactionBuilder = void 0;
const AddressAliasTransactionBodyBuilder_1 = require("./AddressAliasTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAddressAliasTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor({ signerPublicKey, version, network, type, namespaceId, address, aliasAction, }) {
        super({ signerPublicKey, version, network, type });
        this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder({ namespaceId, address, aliasAction });
        if (version !== EmbeddedAddressAliasTransactionBuilder.VERSION)
            throw new Error('The provided version value ' +
                version +
                ' is invalid. Expected value is ' +
                EmbeddedAddressAliasTransactionBuilder.VERSION);
        if (type !== EmbeddedAddressAliasTransactionBuilder.ENTITY_TYPE)
            throw new Error('The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedAddressAliasTransactionBuilder.ENTITY_TYPE);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const addressAliasTransactionBody = AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressAliasTransactionBody.size);
        return new EmbeddedAddressAliasTransactionBuilder({
            signerPublicKey: superObject.signerPublicKey,
            version: superObject.version,
            network: superObject.network,
            type: superObject.type,
            namespaceId: addressAliasTransactionBody.namespaceId,
            address: addressAliasTransactionBody.address,
            aliasAction: addressAliasTransactionBody.aliasAction,
        });
    }
    static createEmbeddedAddressAliasTransactionBuilder(signerPublicKey, network, namespaceId, address, aliasAction) {
        const version = EmbeddedAddressAliasTransactionBuilder.VERSION;
        const type = EmbeddedAddressAliasTransactionBuilder.ENTITY_TYPE;
        return new EmbeddedAddressAliasTransactionBuilder({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
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
exports.EmbeddedAddressAliasTransactionBuilder = EmbeddedAddressAliasTransactionBuilder;
EmbeddedAddressAliasTransactionBuilder.VERSION = 1;
EmbeddedAddressAliasTransactionBuilder.ENTITY_TYPE = EntityTypeDto_1.EntityTypeDto.EMBEDDED_ADDRESS_ALIAS_TRANSACTION;
//# sourceMappingURL=EmbeddedAddressAliasTransactionBuilder.js.map
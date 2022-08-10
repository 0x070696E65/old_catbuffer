"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHelper = void 0;
const AccountAddressRestrictionTransactionBuilder_1 = require("./AccountAddressRestrictionTransactionBuilder");
const AccountKeyLinkTransactionBuilder_1 = require("./AccountKeyLinkTransactionBuilder");
const AccountMetadataTransactionBuilder_1 = require("./AccountMetadataTransactionBuilder");
const AccountMosaicRestrictionTransactionBuilder_1 = require("./AccountMosaicRestrictionTransactionBuilder");
const AccountOperationRestrictionTransactionBuilder_1 = require("./AccountOperationRestrictionTransactionBuilder");
const AddressAliasTransactionBuilder_1 = require("./AddressAliasTransactionBuilder");
const AggregateBondedTransactionBuilder_1 = require("./AggregateBondedTransactionBuilder");
const AggregateCompleteTransactionBuilder_1 = require("./AggregateCompleteTransactionBuilder");
const HashLockTransactionBuilder_1 = require("./HashLockTransactionBuilder");
const MosaicAddressRestrictionTransactionBuilder_1 = require("./MosaicAddressRestrictionTransactionBuilder");
const MosaicAliasTransactionBuilder_1 = require("./MosaicAliasTransactionBuilder");
const MosaicDefinitionTransactionBuilder_1 = require("./MosaicDefinitionTransactionBuilder");
const MosaicGlobalRestrictionTransactionBuilder_1 = require("./MosaicGlobalRestrictionTransactionBuilder");
const MosaicMetadataTransactionBuilder_1 = require("./MosaicMetadataTransactionBuilder");
const MosaicSupplyChangeTransactionBuilder_1 = require("./MosaicSupplyChangeTransactionBuilder");
const MultisigAccountModificationTransactionBuilder_1 = require("./MultisigAccountModificationTransactionBuilder");
const NamespaceMetadataTransactionBuilder_1 = require("./NamespaceMetadataTransactionBuilder");
const NamespaceRegistrationTransactionBuilder_1 = require("./NamespaceRegistrationTransactionBuilder");
const NodeKeyLinkTransactionBuilder_1 = require("./NodeKeyLinkTransactionBuilder");
const SecretLockTransactionBuilder_1 = require("./SecretLockTransactionBuilder");
const SecretProofTransactionBuilder_1 = require("./SecretProofTransactionBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
const TransferTransactionBuilder_1 = require("./TransferTransactionBuilder");
const VotingKeyLinkTransactionBuilder_1 = require("./VotingKeyLinkTransactionBuilder");
const VrfKeyLinkTransactionBuilder_1 = require("./VrfKeyLinkTransactionBuilder");
class TransactionHelper {
    static loadFromBinary(payload) {
        const header = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        if (header.type === 16716 && header.version === 1) {
            return AccountKeyLinkTransactionBuilder_1.AccountKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16972 && header.version === 1) {
            return NodeKeyLinkTransactionBuilder_1.NodeKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16705 && header.version === 1) {
            return AggregateCompleteTransactionBuilder_1.AggregateCompleteTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16961 && header.version === 1) {
            return AggregateBondedTransactionBuilder_1.AggregateBondedTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16707 && header.version === 1) {
            return VotingKeyLinkTransactionBuilder_1.VotingKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16963 && header.version === 1) {
            return VrfKeyLinkTransactionBuilder_1.VrfKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16712 && header.version === 1) {
            return HashLockTransactionBuilder_1.HashLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16722 && header.version === 1) {
            return SecretLockTransactionBuilder_1.SecretLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16978 && header.version === 1) {
            return SecretProofTransactionBuilder_1.SecretProofTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16708 && header.version === 1) {
            return AccountMetadataTransactionBuilder_1.AccountMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16964 && header.version === 1) {
            return MosaicMetadataTransactionBuilder_1.MosaicMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 17220 && header.version === 1) {
            return NamespaceMetadataTransactionBuilder_1.NamespaceMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16717 && header.version === 1) {
            return MosaicDefinitionTransactionBuilder_1.MosaicDefinitionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16973 && header.version === 1) {
            return MosaicSupplyChangeTransactionBuilder_1.MosaicSupplyChangeTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16725 && header.version === 1) {
            return MultisigAccountModificationTransactionBuilder_1.MultisigAccountModificationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16974 && header.version === 1) {
            return AddressAliasTransactionBuilder_1.AddressAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 17230 && header.version === 1) {
            return MosaicAliasTransactionBuilder_1.MosaicAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16718 && header.version === 1) {
            return NamespaceRegistrationTransactionBuilder_1.NamespaceRegistrationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16720 && header.version === 1) {
            return AccountAddressRestrictionTransactionBuilder_1.AccountAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16976 && header.version === 1) {
            return AccountMosaicRestrictionTransactionBuilder_1.AccountMosaicRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 17232 && header.version === 1) {
            return AccountOperationRestrictionTransactionBuilder_1.AccountOperationRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16977 && header.version === 1) {
            return MosaicAddressRestrictionTransactionBuilder_1.MosaicAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16721 && header.version === 1) {
            return MosaicGlobalRestrictionTransactionBuilder_1.MosaicGlobalRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16724 && header.version === 1) {
            return TransferTransactionBuilder_1.TransferTransactionBuilder.loadFromBinary(payload);
        }
        return header;
    }
}
exports.TransactionHelper = TransactionHelper;
//# sourceMappingURL=TransactionHelper.js.map
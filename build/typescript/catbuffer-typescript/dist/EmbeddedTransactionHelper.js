"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedTransactionHelper = void 0;
const EmbeddedAccountAddressRestrictionTransactionBuilder_1 = require("./EmbeddedAccountAddressRestrictionTransactionBuilder");
const EmbeddedAccountKeyLinkTransactionBuilder_1 = require("./EmbeddedAccountKeyLinkTransactionBuilder");
const EmbeddedAccountMetadataTransactionBuilder_1 = require("./EmbeddedAccountMetadataTransactionBuilder");
const EmbeddedAccountMosaicRestrictionTransactionBuilder_1 = require("./EmbeddedAccountMosaicRestrictionTransactionBuilder");
const EmbeddedAccountOperationRestrictionTransactionBuilder_1 = require("./EmbeddedAccountOperationRestrictionTransactionBuilder");
const EmbeddedAddressAliasTransactionBuilder_1 = require("./EmbeddedAddressAliasTransactionBuilder");
const EmbeddedHashLockTransactionBuilder_1 = require("./EmbeddedHashLockTransactionBuilder");
const EmbeddedMosaicAddressRestrictionTransactionBuilder_1 = require("./EmbeddedMosaicAddressRestrictionTransactionBuilder");
const EmbeddedMosaicAliasTransactionBuilder_1 = require("./EmbeddedMosaicAliasTransactionBuilder");
const EmbeddedMosaicDefinitionTransactionBuilder_1 = require("./EmbeddedMosaicDefinitionTransactionBuilder");
const EmbeddedMosaicGlobalRestrictionTransactionBuilder_1 = require("./EmbeddedMosaicGlobalRestrictionTransactionBuilder");
const EmbeddedMosaicMetadataTransactionBuilder_1 = require("./EmbeddedMosaicMetadataTransactionBuilder");
const EmbeddedMosaicSupplyChangeTransactionBuilder_1 = require("./EmbeddedMosaicSupplyChangeTransactionBuilder");
const EmbeddedMultisigAccountModificationTransactionBuilder_1 = require("./EmbeddedMultisigAccountModificationTransactionBuilder");
const EmbeddedNamespaceMetadataTransactionBuilder_1 = require("./EmbeddedNamespaceMetadataTransactionBuilder");
const EmbeddedNamespaceRegistrationTransactionBuilder_1 = require("./EmbeddedNamespaceRegistrationTransactionBuilder");
const EmbeddedNodeKeyLinkTransactionBuilder_1 = require("./EmbeddedNodeKeyLinkTransactionBuilder");
const EmbeddedSecretLockTransactionBuilder_1 = require("./EmbeddedSecretLockTransactionBuilder");
const EmbeddedSecretProofTransactionBuilder_1 = require("./EmbeddedSecretProofTransactionBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EmbeddedTransferTransactionBuilder_1 = require("./EmbeddedTransferTransactionBuilder");
const EmbeddedVotingKeyLinkTransactionBuilder_1 = require("./EmbeddedVotingKeyLinkTransactionBuilder");
const EmbeddedVrfKeyLinkTransactionBuilder_1 = require("./EmbeddedVrfKeyLinkTransactionBuilder");
class EmbeddedTransactionHelper {
    static loadFromBinary(payload) {
        const header = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        if (header.type === 16716 && header.version == 1) {
            return EmbeddedAccountKeyLinkTransactionBuilder_1.EmbeddedAccountKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16972 && header.version == 1) {
            return EmbeddedNodeKeyLinkTransactionBuilder_1.EmbeddedNodeKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16707 && header.version == 1) {
            return EmbeddedVotingKeyLinkTransactionBuilder_1.EmbeddedVotingKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16963 && header.version == 1) {
            return EmbeddedVrfKeyLinkTransactionBuilder_1.EmbeddedVrfKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16712 && header.version == 1) {
            return EmbeddedHashLockTransactionBuilder_1.EmbeddedHashLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16722 && header.version == 1) {
            return EmbeddedSecretLockTransactionBuilder_1.EmbeddedSecretLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16978 && header.version == 1) {
            return EmbeddedSecretProofTransactionBuilder_1.EmbeddedSecretProofTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16708 && header.version == 1) {
            return EmbeddedAccountMetadataTransactionBuilder_1.EmbeddedAccountMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16964 && header.version == 1) {
            return EmbeddedMosaicMetadataTransactionBuilder_1.EmbeddedMosaicMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 17220 && header.version == 1) {
            return EmbeddedNamespaceMetadataTransactionBuilder_1.EmbeddedNamespaceMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16717 && header.version == 1) {
            return EmbeddedMosaicDefinitionTransactionBuilder_1.EmbeddedMosaicDefinitionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16973 && header.version == 1) {
            return EmbeddedMosaicSupplyChangeTransactionBuilder_1.EmbeddedMosaicSupplyChangeTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16725 && header.version == 1) {
            return EmbeddedMultisigAccountModificationTransactionBuilder_1.EmbeddedMultisigAccountModificationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16974 && header.version == 1) {
            return EmbeddedAddressAliasTransactionBuilder_1.EmbeddedAddressAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 17230 && header.version == 1) {
            return EmbeddedMosaicAliasTransactionBuilder_1.EmbeddedMosaicAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16718 && header.version == 1) {
            return EmbeddedNamespaceRegistrationTransactionBuilder_1.EmbeddedNamespaceRegistrationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16720 && header.version == 1) {
            return EmbeddedAccountAddressRestrictionTransactionBuilder_1.EmbeddedAccountAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16976 && header.version == 1) {
            return EmbeddedAccountMosaicRestrictionTransactionBuilder_1.EmbeddedAccountMosaicRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 17232 && header.version == 1) {
            return EmbeddedAccountOperationRestrictionTransactionBuilder_1.EmbeddedAccountOperationRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16977 && header.version == 1) {
            return EmbeddedMosaicAddressRestrictionTransactionBuilder_1.EmbeddedMosaicAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16721 && header.version == 1) {
            return EmbeddedMosaicGlobalRestrictionTransactionBuilder_1.EmbeddedMosaicGlobalRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16724 && header.version == 1) {
            return EmbeddedTransferTransactionBuilder_1.EmbeddedTransferTransactionBuilder.loadFromBinary(payload);
        }
        return header;
    }
}
exports.EmbeddedTransactionHelper = EmbeddedTransactionHelper;
//# sourceMappingURL=EmbeddedTransactionHelper.js.map
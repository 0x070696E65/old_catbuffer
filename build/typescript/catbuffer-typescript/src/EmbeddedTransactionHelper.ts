/**
 *** Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
 *** Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
 *** All rights reserved.
 ***
 *** This file is part of Catapult.
 ***
 *** Catapult is free software: you can redistribute it and/or modify
 *** it under the terms of the GNU Lesser General Public License as published by
 *** the Free Software Foundation, either version 3 of the License, or
 *** (at your option) any later version.
 ***
 *** Catapult is distributed in the hope that it will be useful,
 *** but WITHOUT ANY WARRANTY; without even the implied warranty of
 *** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *** GNU Lesser General Public License for more details.
 ***
 *** You should have received a copy of the GNU Lesser General Public License
 *** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
 **/

import { EmbeddedAccountAddressRestrictionTransactionBuilder } from './EmbeddedAccountAddressRestrictionTransactionBuilder';
import { EmbeddedAccountKeyLinkTransactionBuilder } from './EmbeddedAccountKeyLinkTransactionBuilder';
import { EmbeddedAccountMetadataTransactionBuilder } from './EmbeddedAccountMetadataTransactionBuilder';
import { EmbeddedAccountMosaicRestrictionTransactionBuilder } from './EmbeddedAccountMosaicRestrictionTransactionBuilder';
import { EmbeddedAccountOperationRestrictionTransactionBuilder } from './EmbeddedAccountOperationRestrictionTransactionBuilder';
import { EmbeddedAddressAliasTransactionBuilder } from './EmbeddedAddressAliasTransactionBuilder';
import { EmbeddedHashLockTransactionBuilder } from './EmbeddedHashLockTransactionBuilder';
import { EmbeddedMosaicAddressRestrictionTransactionBuilder } from './EmbeddedMosaicAddressRestrictionTransactionBuilder';
import { EmbeddedMosaicAliasTransactionBuilder } from './EmbeddedMosaicAliasTransactionBuilder';
import { EmbeddedMosaicDefinitionTransactionBuilder } from './EmbeddedMosaicDefinitionTransactionBuilder';
import { EmbeddedMosaicGlobalRestrictionTransactionBuilder } from './EmbeddedMosaicGlobalRestrictionTransactionBuilder';
import { EmbeddedMosaicMetadataTransactionBuilder } from './EmbeddedMosaicMetadataTransactionBuilder';
import { EmbeddedMosaicSupplyChangeTransactionBuilder } from './EmbeddedMosaicSupplyChangeTransactionBuilder';
import { EmbeddedMultisigAccountModificationTransactionBuilder } from './EmbeddedMultisigAccountModificationTransactionBuilder';
import { EmbeddedNamespaceMetadataTransactionBuilder } from './EmbeddedNamespaceMetadataTransactionBuilder';
import { EmbeddedNamespaceRegistrationTransactionBuilder } from './EmbeddedNamespaceRegistrationTransactionBuilder';
import { EmbeddedNodeKeyLinkTransactionBuilder } from './EmbeddedNodeKeyLinkTransactionBuilder';
import { EmbeddedSecretLockTransactionBuilder } from './EmbeddedSecretLockTransactionBuilder';
import { EmbeddedSecretProofTransactionBuilder } from './EmbeddedSecretProofTransactionBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { EmbeddedTransferTransactionBuilder } from './EmbeddedTransferTransactionBuilder';
import { EmbeddedVotingKeyLinkTransactionBuilder } from './EmbeddedVotingKeyLinkTransactionBuilder';
import { EmbeddedVrfKeyLinkTransactionBuilder } from './EmbeddedVrfKeyLinkTransactionBuilder';

/** Helper class for embedded transaction serialization */
export class EmbeddedTransactionHelper {
    /** Deserialize an embedded transaction builder from binary */
    public static loadFromBinary(payload: Uint8Array): EmbeddedTransactionBuilder {
        const header = EmbeddedTransactionBuilder.loadFromBinary(payload);

        if (header.type === 16716 && header.version == 1) {
            return EmbeddedAccountKeyLinkTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16972 && header.version == 1) {
            return EmbeddedNodeKeyLinkTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16707 && header.version == 1) {
            return EmbeddedVotingKeyLinkTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16963 && header.version == 1) {
            return EmbeddedVrfKeyLinkTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16712 && header.version == 1) {
            return EmbeddedHashLockTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16722 && header.version == 1) {
            return EmbeddedSecretLockTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16978 && header.version == 1) {
            return EmbeddedSecretProofTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16708 && header.version == 1) {
            return EmbeddedAccountMetadataTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16964 && header.version == 1) {
            return EmbeddedMosaicMetadataTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 17220 && header.version == 1) {
            return EmbeddedNamespaceMetadataTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16717 && header.version == 1) {
            return EmbeddedMosaicDefinitionTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16973 && header.version == 1) {
            return EmbeddedMosaicSupplyChangeTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16725 && header.version == 1) {
            return EmbeddedMultisigAccountModificationTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16974 && header.version == 1) {
            return EmbeddedAddressAliasTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 17230 && header.version == 1) {
            return EmbeddedMosaicAliasTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16718 && header.version == 1) {
            return EmbeddedNamespaceRegistrationTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16720 && header.version == 1) {
            return EmbeddedAccountAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16976 && header.version == 1) {
            return EmbeddedAccountMosaicRestrictionTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 17232 && header.version == 1) {
            return EmbeddedAccountOperationRestrictionTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16977 && header.version == 1) {
            return EmbeddedMosaicAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16721 && header.version == 1) {
            return EmbeddedMosaicGlobalRestrictionTransactionBuilder.loadFromBinary(payload);
        }

        if (header.type === 16724 && header.version == 1) {
            return EmbeddedTransferTransactionBuilder.loadFromBinary(payload);
        }

        return header;
    }
}

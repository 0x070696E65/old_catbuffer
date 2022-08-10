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

import { AccountAddressRestrictionTransactionBuilder } from './AccountAddressRestrictionTransactionBuilder';
import { AccountKeyLinkTransactionBuilder } from './AccountKeyLinkTransactionBuilder';
import { AccountMetadataTransactionBuilder } from './AccountMetadataTransactionBuilder';
import { AccountMosaicRestrictionTransactionBuilder } from './AccountMosaicRestrictionTransactionBuilder';
import { AccountOperationRestrictionTransactionBuilder } from './AccountOperationRestrictionTransactionBuilder';
import { AddressAliasTransactionBuilder } from './AddressAliasTransactionBuilder';
import { AggregateBondedTransactionBuilder } from './AggregateBondedTransactionBuilder';
import { AggregateCompleteTransactionBuilder } from './AggregateCompleteTransactionBuilder';
import { HashLockTransactionBuilder } from './HashLockTransactionBuilder';
import { MosaicAddressRestrictionTransactionBuilder } from './MosaicAddressRestrictionTransactionBuilder';
import { MosaicAliasTransactionBuilder } from './MosaicAliasTransactionBuilder';
import { MosaicDefinitionTransactionBuilder } from './MosaicDefinitionTransactionBuilder';
import { MosaicGlobalRestrictionTransactionBuilder } from './MosaicGlobalRestrictionTransactionBuilder';
import { MosaicMetadataTransactionBuilder } from './MosaicMetadataTransactionBuilder';
import { MosaicSupplyChangeTransactionBuilder } from './MosaicSupplyChangeTransactionBuilder';
import { MultisigAccountModificationTransactionBuilder } from './MultisigAccountModificationTransactionBuilder';
import { NamespaceMetadataTransactionBuilder } from './NamespaceMetadataTransactionBuilder';
import { NamespaceRegistrationTransactionBuilder } from './NamespaceRegistrationTransactionBuilder';
import { NodeKeyLinkTransactionBuilder } from './NodeKeyLinkTransactionBuilder';
import { SecretLockTransactionBuilder } from './SecretLockTransactionBuilder';
import { SecretProofTransactionBuilder } from './SecretProofTransactionBuilder';
import { TransactionBuilder } from './TransactionBuilder';
import { TransferTransactionBuilder } from './TransferTransactionBuilder';
import { VotingKeyLinkTransactionBuilder } from './VotingKeyLinkTransactionBuilder';
import { VrfKeyLinkTransactionBuilder } from './VrfKeyLinkTransactionBuilder';

/** Helper class for embedded transaction serialization */
export class TransactionHelper {
    /** Deserialize an transaction builder from binary */
    public static loadFromBinary(payload: Uint8Array): TransactionBuilder {
        const header = TransactionBuilder.loadFromBinary(payload);
        if (header.type === 16716 && header.version === 1) {
            return AccountKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16972 && header.version === 1) {
            return NodeKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16705 && header.version === 1) {
            return AggregateCompleteTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16961 && header.version === 1) {
            return AggregateBondedTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16707 && header.version === 1) {
            return VotingKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16963 && header.version === 1) {
            return VrfKeyLinkTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16712 && header.version === 1) {
            return HashLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16722 && header.version === 1) {
            return SecretLockTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16978 && header.version === 1) {
            return SecretProofTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16708 && header.version === 1) {
            return AccountMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16964 && header.version === 1) {
            return MosaicMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 17220 && header.version === 1) {
            return NamespaceMetadataTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16717 && header.version === 1) {
            return MosaicDefinitionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16973 && header.version === 1) {
            return MosaicSupplyChangeTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16725 && header.version === 1) {
            return MultisigAccountModificationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16974 && header.version === 1) {
            return AddressAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 17230 && header.version === 1) {
            return MosaicAliasTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16718 && header.version === 1) {
            return NamespaceRegistrationTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16720 && header.version === 1) {
            return AccountAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16976 && header.version === 1) {
            return AccountMosaicRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 17232 && header.version === 1) {
            return AccountOperationRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16977 && header.version === 1) {
            return MosaicAddressRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16721 && header.version === 1) {
            return MosaicGlobalRestrictionTransactionBuilder.loadFromBinary(payload);
        }
        if (header.type === 16724 && header.version === 1) {
            return TransferTransactionBuilder.loadFromBinary(payload);
        }

        return header;
    }
}

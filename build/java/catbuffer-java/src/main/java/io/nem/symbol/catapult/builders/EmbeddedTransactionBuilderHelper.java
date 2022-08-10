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

package io.nem.symbol.catapult.builders;

import java.io.DataInputStream;
import java.io.SequenceInputStream;
import java.io.ByteArrayInputStream;

/** Factory in charge of creating the right transaction builder from the streamed data. */
public class EmbeddedTransactionBuilderHelper {

    /**
    * It creates the rigth embbeded transaction builder from the stream data.
    *
    * @param stream the stream
    * @return the EmbeddedTransactionBuilder subclass
    */
    public static EmbeddedTransactionBuilder loadFromBinary(final DataInputStream stream) {

        EmbeddedTransactionBuilder headerBuilder = EmbeddedTransactionBuilder.loadFromBinary(stream);
                                                                                                                                                                                                                                                                                                                                                                                                                                            if (headerBuilder.getType().getValue() == 16716 && headerBuilder.getVersion() == 1) {
            AccountKeyLinkTransactionBodyBuilder bodyBuilder = AccountKeyLinkTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedAccountKeyLinkTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16972 && headerBuilder.getVersion() == 1) {
            NodeKeyLinkTransactionBodyBuilder bodyBuilder = NodeKeyLinkTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedNodeKeyLinkTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                                        if (headerBuilder.getType().getValue() == 16707 && headerBuilder.getVersion() == 1) {
            VotingKeyLinkTransactionBodyBuilder bodyBuilder = VotingKeyLinkTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedVotingKeyLinkTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16963 && headerBuilder.getVersion() == 1) {
            VrfKeyLinkTransactionBodyBuilder bodyBuilder = VrfKeyLinkTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedVrfKeyLinkTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16712 && headerBuilder.getVersion() == 1) {
            HashLockTransactionBodyBuilder bodyBuilder = HashLockTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedHashLockTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16722 && headerBuilder.getVersion() == 1) {
            SecretLockTransactionBodyBuilder bodyBuilder = SecretLockTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedSecretLockTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16978 && headerBuilder.getVersion() == 1) {
            SecretProofTransactionBodyBuilder bodyBuilder = SecretProofTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedSecretProofTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16708 && headerBuilder.getVersion() == 1) {
            AccountMetadataTransactionBodyBuilder bodyBuilder = AccountMetadataTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedAccountMetadataTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16964 && headerBuilder.getVersion() == 1) {
            MosaicMetadataTransactionBodyBuilder bodyBuilder = MosaicMetadataTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedMosaicMetadataTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 17220 && headerBuilder.getVersion() == 1) {
            NamespaceMetadataTransactionBodyBuilder bodyBuilder = NamespaceMetadataTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedNamespaceMetadataTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16717 && headerBuilder.getVersion() == 1) {
            MosaicDefinitionTransactionBodyBuilder bodyBuilder = MosaicDefinitionTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedMosaicDefinitionTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16973 && headerBuilder.getVersion() == 1) {
            MosaicSupplyChangeTransactionBodyBuilder bodyBuilder = MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedMosaicSupplyChangeTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16725 && headerBuilder.getVersion() == 1) {
            MultisigAccountModificationTransactionBodyBuilder bodyBuilder = MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedMultisigAccountModificationTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16974 && headerBuilder.getVersion() == 1) {
            AddressAliasTransactionBodyBuilder bodyBuilder = AddressAliasTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedAddressAliasTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 17230 && headerBuilder.getVersion() == 1) {
            MosaicAliasTransactionBodyBuilder bodyBuilder = MosaicAliasTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedMosaicAliasTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16718 && headerBuilder.getVersion() == 1) {
            NamespaceRegistrationTransactionBodyBuilder bodyBuilder = NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedNamespaceRegistrationTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16720 && headerBuilder.getVersion() == 1) {
            AccountAddressRestrictionTransactionBodyBuilder bodyBuilder = AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedAccountAddressRestrictionTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16976 && headerBuilder.getVersion() == 1) {
            AccountMosaicRestrictionTransactionBodyBuilder bodyBuilder = AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedAccountMosaicRestrictionTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 17232 && headerBuilder.getVersion() == 1) {
            AccountOperationRestrictionTransactionBodyBuilder bodyBuilder = AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedAccountOperationRestrictionTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16977 && headerBuilder.getVersion() == 1) {
            MosaicAddressRestrictionTransactionBodyBuilder bodyBuilder = MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedMosaicAddressRestrictionTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16721 && headerBuilder.getVersion() == 1) {
            MosaicGlobalRestrictionTransactionBodyBuilder bodyBuilder = MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedMosaicGlobalRestrictionTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
                    if (headerBuilder.getType().getValue() == 16724 && headerBuilder.getVersion() == 1) {
            TransferTransactionBodyBuilder bodyBuilder = TransferTransactionBodyBuilder.loadFromBinary(stream);
            SequenceInputStream concatenate = new SequenceInputStream(
            new ByteArrayInputStream(headerBuilder.serialize()),
            new ByteArrayInputStream(bodyBuilder.serialize()));
            return EmbeddedTransferTransactionBuilder.loadFromBinary(new DataInputStream(concatenate));
        }
        return headerBuilder;
    }

}


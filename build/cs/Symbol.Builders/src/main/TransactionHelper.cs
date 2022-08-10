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

using System;
using System.IO;

/* Factory in charge of creating the right transaction builder from the streamed data. */

namespace Symbol.Builders {
    [Serializable]
    public class TransactionHelper {

        /*
        * It creates the right transaction builder from the stream data.
        *
        * @param stream the stream
        * @return the TransactionBuilder subclass
        */
        public static TransactionBuilder LoadFromBinary(BinaryReader stream) {

            TransactionBuilder headerBuilder = TransactionBuilder.LoadFromBinary(stream);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            if ((int)headerBuilder.type == 16716 && headerBuilder.version == 1) {
                return  AccountKeyLinkTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16972 && headerBuilder.version == 1) {
                return  NodeKeyLinkTransactionBuilder.LoadFromBinary(stream);
            }
                                                    if ((int)headerBuilder.type == 16705 && headerBuilder.version == 1) {
                return  AggregateCompleteTransactionBuilder.LoadFromBinary(stream);
            }
                    if ((int)headerBuilder.type == 16961 && headerBuilder.version == 1) {
                return  AggregateBondedTransactionBuilder.LoadFromBinary(stream);
            }
                            if ((int)headerBuilder.type == 16707 && headerBuilder.version == 1) {
                return  VotingKeyLinkTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16963 && headerBuilder.version == 1) {
                return  VrfKeyLinkTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16712 && headerBuilder.version == 1) {
                return  HashLockTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16722 && headerBuilder.version == 1) {
                return  SecretLockTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16978 && headerBuilder.version == 1) {
                return  SecretProofTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16708 && headerBuilder.version == 1) {
                return  AccountMetadataTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16964 && headerBuilder.version == 1) {
                return  MosaicMetadataTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 17220 && headerBuilder.version == 1) {
                return  NamespaceMetadataTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16717 && headerBuilder.version == 1) {
                return  MosaicDefinitionTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16973 && headerBuilder.version == 1) {
                return  MosaicSupplyChangeTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16725 && headerBuilder.version == 1) {
                return  MultisigAccountModificationTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16974 && headerBuilder.version == 1) {
                return  AddressAliasTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 17230 && headerBuilder.version == 1) {
                return  MosaicAliasTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16718 && headerBuilder.version == 1) {
                return  NamespaceRegistrationTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16720 && headerBuilder.version == 1) {
                return  AccountAddressRestrictionTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16976 && headerBuilder.version == 1) {
                return  AccountMosaicRestrictionTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 17232 && headerBuilder.version == 1) {
                return  AccountOperationRestrictionTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16977 && headerBuilder.version == 1) {
                return  MosaicAddressRestrictionTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16721 && headerBuilder.version == 1) {
                return  MosaicGlobalRestrictionTransactionBuilder.LoadFromBinary(stream);
            }
                                    if ((int)headerBuilder.type == 16724 && headerBuilder.version == 1) {
                return  TransferTransactionBuilder.LoadFromBinary(stream);
            }
                return headerBuilder;
        }
    }
}


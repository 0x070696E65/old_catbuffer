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

import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { MultisigAccountModificationTransactionBodyBuilder } from './MultisigAccountModificationTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 *  Interface to create instances of EmbeddedMultisigAccountModificationTransactionBuilder.
 */
export interface EmbeddedMultisigAccountModificationTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Relative change of the minimal number of cosignatories required when removing an account. **/
    minRemovalDelta: number;
    /** Relative change of the minimal number of cosignatories required when approving a transaction. **/
    minApprovalDelta: number;
    /** Cosignatory address additions. **/
    addressAdditions: UnresolvedAddressDto[];
    /** Cosignatory address deletions. **/
    addressDeletions: UnresolvedAddressDto[];
}

/**
 * Binary layout for an embedded multisig account modification transaction
 **/
export class EmbeddedMultisigAccountModificationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_MULTISIG_ACCOUNT_MODIFICATION_TRANSACTION;

    /** Multisig account modification transaction body. **/
    public readonly multisigAccountModificationTransactionBody: MultisigAccountModificationTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
     * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
     * @param addressAdditions Cosignatory address additions.
     * @param addressDeletions Cosignatory address deletions.
     */
    public constructor({
        signerPublicKey,
        version,
        network,
        type,
        minRemovalDelta,
        minApprovalDelta,
        addressAdditions,
        addressDeletions,
    }: EmbeddedMultisigAccountModificationTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder({
            minRemovalDelta,
            minApprovalDelta,
            addressAdditions,
            addressDeletions,
        });
        if (version !== EmbeddedMultisigAccountModificationTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedMultisigAccountModificationTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedMultisigAccountModificationTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' +
                    type +
                    ' is invalid. Expected value is ' +
                    EmbeddedMultisigAccountModificationTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMultisigAccountModificationTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const multisigAccountModificationTransactionBody: MultisigAccountModificationTransactionBodyBuilder =
            MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
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

    /**
     * Creates an instance of EmbeddedMultisigAccountModificationTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param minRemovalDelta Relative change of the minimal number of cosignatories required when removing an account.
     * @param minApprovalDelta Relative change of the minimal number of cosignatories required when approving a transaction.
     * @param addressAdditions Cosignatory address additions.
     * @param addressDeletions Cosignatory address deletions.
     * @return Instance of EmbeddedMultisigAccountModificationTransactionBuilder.
     */
    public static createEmbeddedMultisigAccountModificationTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        minRemovalDelta: number,
        minApprovalDelta: number,
        addressAdditions: UnresolvedAddressDto[],
        addressDeletions: UnresolvedAddressDto[],
    ): EmbeddedMultisigAccountModificationTransactionBuilder {
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

    /**
     * Gets relative change of the minimal number of cosignatories required when removing an account.
     *
     * @return Relative change of the minimal number of cosignatories required when removing an account.
     */
    public get minRemovalDelta(): number {
        return this.multisigAccountModificationTransactionBody.minRemovalDelta;
    }

    /**
     * Gets relative change of the minimal number of cosignatories required when approving a transaction.
     *
     * @return Relative change of the minimal number of cosignatories required when approving a transaction.
     */
    public get minApprovalDelta(): number {
        return this.multisigAccountModificationTransactionBody.minApprovalDelta;
    }

    /**
     * Gets cosignatory address additions.
     *
     * @return Cosignatory address additions.
     */
    public get addressAdditions(): UnresolvedAddressDto[] {
        return this.multisigAccountModificationTransactionBody.addressAdditions;
    }

    /**
     * Gets cosignatory address deletions.
     *
     * @return Cosignatory address deletions.
     */
    public get addressDeletions(): UnresolvedAddressDto[] {
        return this.multisigAccountModificationTransactionBody.addressDeletions;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.multisigAccountModificationTransactionBody.size; // multisigAccountModificationTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): MultisigAccountModificationTransactionBodyBuilder {
        return this.multisigAccountModificationTransactionBody;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const multisigAccountModificationTransactionBodyBytes = this.multisigAccountModificationTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyBytes);
        return newArray;
    }
}

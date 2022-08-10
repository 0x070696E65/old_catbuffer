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

import { AddressAliasTransactionBodyBuilder } from './AddressAliasTransactionBodyBuilder';
import { AddressDto } from './AddressDto';
import { AliasActionDto } from './AliasActionDto';
import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of EmbeddedAddressAliasTransactionBuilder.
 */
export interface EmbeddedAddressAliasTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    /** Identifier of the namespace that will become an alias. **/
    namespaceId: NamespaceIdDto;
    /** Aliased address. **/
    address: AddressDto;
    /** Alias action. **/
    aliasAction: AliasActionDto;
}

/**
 * Binary layout for an embedded address alias transaction
 **/
export class EmbeddedAddressAliasTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    public static readonly VERSION = 1;
    public static readonly ENTITY_TYPE = EntityTypeDto.EMBEDDED_ADDRESS_ALIAS_TRANSACTION;

    /** Address alias transaction body. **/
    public readonly addressAliasTransactionBody: AddressAliasTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param namespaceId Identifier of the namespace that will become an alias.
     * @param address Aliased address.
     * @param aliasAction Alias action.
     */
    public constructor({
        signerPublicKey,
        version,
        network,
        type,
        namespaceId,
        address,
        aliasAction,
    }: EmbeddedAddressAliasTransactionBuilderParams) {
        super({ signerPublicKey, version, network, type });
        this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder({ namespaceId, address, aliasAction });
        if (version !== EmbeddedAddressAliasTransactionBuilder.VERSION)
            throw new Error(
                'The provided version value ' +
                    version +
                    ' is invalid. Expected value is ' +
                    EmbeddedAddressAliasTransactionBuilder.VERSION,
            );
        if (type !== EmbeddedAddressAliasTransactionBuilder.ENTITY_TYPE)
            throw new Error(
                'The provided type value ' + type + ' is invalid. Expected value is ' + EmbeddedAddressAliasTransactionBuilder.ENTITY_TYPE,
            );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedAddressAliasTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const addressAliasTransactionBody: AddressAliasTransactionBodyBuilder = AddressAliasTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
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

    /**
     * Creates an instance of EmbeddedAddressAliasTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param network Entity network.
     * @param namespaceId Identifier of the namespace that will become an alias.
     * @param address Aliased address.
     * @param aliasAction Alias action.
     * @return Instance of EmbeddedAddressAliasTransactionBuilder.
     */
    public static createEmbeddedAddressAliasTransactionBuilder(
        signerPublicKey: KeyDto,
        network: NetworkTypeDto,
        namespaceId: NamespaceIdDto,
        address: AddressDto,
        aliasAction: AliasActionDto,
    ): EmbeddedAddressAliasTransactionBuilder {
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

    /**
     * Gets identifier of the namespace that will become an alias.
     *
     * @return Identifier of the namespace that will become an alias.
     */
    public get namespaceId(): NamespaceIdDto {
        return this.addressAliasTransactionBody.namespaceId;
    }

    /**
     * Gets aliased address.
     *
     * @return Aliased address.
     */
    public get address(): AddressDto {
        return this.addressAliasTransactionBody.address;
    }

    /**
     * Gets alias action.
     *
     * @return Alias action.
     */
    public get aliasAction(): AliasActionDto {
        return this.addressAliasTransactionBody.aliasAction;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.addressAliasTransactionBody.size; // addressAliasTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public get body(): AddressAliasTransactionBodyBuilder {
        return this.addressAliasTransactionBody;
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
        const addressAliasTransactionBodyBytes = this.addressAliasTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, addressAliasTransactionBodyBytes);
        return newArray;
    }
}

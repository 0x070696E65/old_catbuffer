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
import java.nio.ByteBuffer;
import java.util.EnumSet;
import java.util.List;

/**
* Binary layout for a non-embedded address alias transaction
**/
public class AddressAliasTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Address alias transaction body. **/
    private final AddressAliasTransactionBodyBuilder addressAliasTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AddressAliasTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.addressAliasTransactionBody = AddressAliasTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AddressAliasTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AddressAliasTransactionBuilder.
     */
    public static AddressAliasTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new AddressAliasTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signature Entity signature.
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    * @param fee Transaction fee.
    * @param deadline Transaction deadline.
    * @param namespaceId Identifier of the namespace that will become an alias.
    * @param address Aliased address.
    * @param aliasAction Alias action.
    */
    protected AddressAliasTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, NamespaceIdDto namespaceId, AddressDto address, AliasActionDto aliasAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(namespaceId, "namespaceId is null");
        GeneratorUtils.notNull(address, "address is null");
        GeneratorUtils.notNull(aliasAction, "aliasAction is null");
        this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
    }
    
    /**
     * Creates an instance of AddressAliasTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param namespaceId Identifier of the namespace that will become an alias.
     * @param address Aliased address.
     * @param aliasAction Alias action.
     * @return Instance of AddressAliasTransactionBuilder.
     */
    public static AddressAliasTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, NamespaceIdDto namespaceId, AddressDto address, AliasActionDto aliasAction) {
        return new AddressAliasTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, address, aliasAction);
    }

    /**
     * Gets identifier of the namespace that will become an alias.
     *
     * @return Identifier of the namespace that will become an alias.
     */
    public NamespaceIdDto getNamespaceId() {
        return this.addressAliasTransactionBody.getNamespaceId();
    }

    /**
     * Gets aliased address.
     *
     * @return Aliased address.
     */
    public AddressDto getAddress() {
        return this.addressAliasTransactionBody.getAddress();
    }

    /**
     * Gets alias action.
     *
     * @return Alias action.
     */
    public AliasActionDto getAliasAction() {
        return this.addressAliasTransactionBody.getAliasAction();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.addressAliasTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public AddressAliasTransactionBodyBuilder getBody() {
        return this.addressAliasTransactionBody;
    }


    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            final byte[] superBytes = super.serialize();
            dataOutputStream.write(superBytes, 0, superBytes.length);
            GeneratorUtils.writeEntity(dataOutputStream, this.addressAliasTransactionBody);
        });
    }
}


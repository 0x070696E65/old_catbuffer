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
* Binary layout for a non-embedded mosaic alias transaction
**/
public class MosaicAliasTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Mosaic alias transaction body. **/
    private final MosaicAliasTransactionBodyBuilder mosaicAliasTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected MosaicAliasTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.mosaicAliasTransactionBody = MosaicAliasTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of MosaicAliasTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of MosaicAliasTransactionBuilder.
     */
    public static MosaicAliasTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new MosaicAliasTransactionBuilder(stream);
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
    * @param mosaicId Aliased mosaic identifier.
    * @param aliasAction Alias action.
    */
    protected MosaicAliasTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, NamespaceIdDto namespaceId, MosaicIdDto mosaicId, AliasActionDto aliasAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(namespaceId, "namespaceId is null");
        GeneratorUtils.notNull(mosaicId, "mosaicId is null");
        GeneratorUtils.notNull(aliasAction, "aliasAction is null");
        this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
    }
    
    /**
     * Creates an instance of MosaicAliasTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param namespaceId Identifier of the namespace that will become an alias.
     * @param mosaicId Aliased mosaic identifier.
     * @param aliasAction Alias action.
     * @return Instance of MosaicAliasTransactionBuilder.
     */
    public static MosaicAliasTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, NamespaceIdDto namespaceId, MosaicIdDto mosaicId, AliasActionDto aliasAction) {
        return new MosaicAliasTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, mosaicId, aliasAction);
    }

    /**
     * Gets identifier of the namespace that will become an alias.
     *
     * @return Identifier of the namespace that will become an alias.
     */
    public NamespaceIdDto getNamespaceId() {
        return this.mosaicAliasTransactionBody.getNamespaceId();
    }

    /**
     * Gets aliased mosaic identifier.
     *
     * @return Aliased mosaic identifier.
     */
    public MosaicIdDto getMosaicId() {
        return this.mosaicAliasTransactionBody.getMosaicId();
    }

    /**
     * Gets alias action.
     *
     * @return Alias action.
     */
    public AliasActionDto getAliasAction() {
        return this.mosaicAliasTransactionBody.getAliasAction();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.mosaicAliasTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public MosaicAliasTransactionBodyBuilder getBody() {
        return this.mosaicAliasTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaicAliasTransactionBody);
        });
    }
}


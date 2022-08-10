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
* Binary layout for an embedded mosaic address restriction transaction
**/
public class EmbeddedMosaicAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {

    /** Mosaic address restriction transaction body. **/
    private final MosaicAddressRestrictionTransactionBodyBuilder mosaicAddressRestrictionTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected EmbeddedMosaicAddressRestrictionTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.mosaicAddressRestrictionTransactionBody = MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of EmbeddedMosaicAddressRestrictionTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of EmbeddedMosaicAddressRestrictionTransactionBuilder.
     */
    public static EmbeddedMosaicAddressRestrictionTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new EmbeddedMosaicAddressRestrictionTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    * @param mosaicId Identifier of the mosaic to which the restriction applies.
    * @param restrictionKey Restriction key.
    * @param previousRestrictionValue Previous restriction value.
    * @param newRestrictionValue New restriction value.
    * @param targetAddress Address being restricted.
    */
    protected EmbeddedMosaicAddressRestrictionTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedMosaicIdDto mosaicId, long restrictionKey, long previousRestrictionValue, long newRestrictionValue, UnresolvedAddressDto targetAddress) {
        super(signerPublicKey, version, network, type);
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(mosaicId, "mosaicId is null");
        GeneratorUtils.notNull(restrictionKey, "restrictionKey is null");
        GeneratorUtils.notNull(previousRestrictionValue, "previousRestrictionValue is null");
        GeneratorUtils.notNull(newRestrictionValue, "newRestrictionValue is null");
        GeneratorUtils.notNull(targetAddress, "targetAddress is null");
        this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
    }
    
    /**
     * Creates an instance of EmbeddedMosaicAddressRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param mosaicId Identifier of the mosaic to which the restriction applies.
     * @param restrictionKey Restriction key.
     * @param previousRestrictionValue Previous restriction value.
     * @param newRestrictionValue New restriction value.
     * @param targetAddress Address being restricted.
     * @return Instance of EmbeddedMosaicAddressRestrictionTransactionBuilder.
     */
    public static EmbeddedMosaicAddressRestrictionTransactionBuilder create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, UnresolvedMosaicIdDto mosaicId, long restrictionKey, long previousRestrictionValue, long newRestrictionValue, UnresolvedAddressDto targetAddress) {
        return new EmbeddedMosaicAddressRestrictionTransactionBuilder(signerPublicKey, version, network, type, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
    }

    /**
     * Gets identifier of the mosaic to which the restriction applies.
     *
     * @return Identifier of the mosaic to which the restriction applies.
     */
    public UnresolvedMosaicIdDto getMosaicId() {
        return this.mosaicAddressRestrictionTransactionBody.getMosaicId();
    }

    /**
     * Gets restriction key.
     *
     * @return Restriction key.
     */
    public long getRestrictionKey() {
        return this.mosaicAddressRestrictionTransactionBody.getRestrictionKey();
    }

    /**
     * Gets previous restriction value.
     *
     * @return Previous restriction value.
     */
    public long getPreviousRestrictionValue() {
        return this.mosaicAddressRestrictionTransactionBody.getPreviousRestrictionValue();
    }

    /**
     * Gets new restriction value.
     *
     * @return New restriction value.
     */
    public long getNewRestrictionValue() {
        return this.mosaicAddressRestrictionTransactionBody.getNewRestrictionValue();
    }

    /**
     * Gets address being restricted.
     *
     * @return Address being restricted.
     */
    public UnresolvedAddressDto getTargetAddress() {
        return this.mosaicAddressRestrictionTransactionBody.getTargetAddress();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.mosaicAddressRestrictionTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public MosaicAddressRestrictionTransactionBodyBuilder getBody() {
        return this.mosaicAddressRestrictionTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.mosaicAddressRestrictionTransactionBody);
        });
    }
}


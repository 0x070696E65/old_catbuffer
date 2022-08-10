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
* Cosignature attached to an aggregate transaction
**/
public class CosignatureBuilder implements Serializer {

    /** Version. **/
    private final long version;

    /** Cosigner public key. **/
    private final KeyDto signerPublicKey;

    /** Cosigner signature. **/
    private final SignatureDto signature;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected CosignatureBuilder(DataInputStream stream) {
        try {
            this.version = Long.reverseBytes(stream.readLong());
            this.signerPublicKey = KeyDto.loadFromBinary(stream);
            this.signature = SignatureDto.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of CosignatureBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of CosignatureBuilder.
     */
    public static CosignatureBuilder loadFromBinary(DataInputStream stream) {
        return new CosignatureBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Version.
    * @param signerPublicKey Cosigner public key.
    * @param signature Cosigner signature.
    */
    protected CosignatureBuilder(long version, KeyDto signerPublicKey, SignatureDto signature) {
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(signature, "signature is null");
        this.version = version;
        this.signerPublicKey = signerPublicKey;
        this.signature = signature;
    }
    
    /**
     * Creates an instance of CosignatureBuilder.
     *
     * @param version Version.
     * @param signerPublicKey Cosigner public key.
     * @param signature Cosigner signature.
     * @return Instance of CosignatureBuilder.
     */
    public static CosignatureBuilder create(long version, KeyDto signerPublicKey, SignatureDto signature) {
        return new CosignatureBuilder(version, signerPublicKey, signature);
    }

    /**
     * Gets version.
     *
     * @return Version.
     */
    public long getVersion() {
        return this.version;
    }

    /**
     * Gets cosigner public key.
     *
     * @return Cosigner public key.
     */
    public KeyDto getSignerPublicKey() {
        return this.signerPublicKey;
    }

    /**
     * Gets cosigner signature.
     *
     * @return Cosigner signature.
     */
    public SignatureDto getSignature() {
        return this.signature;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = 0;
        size += 8; // version
        size += this.signerPublicKey.getSize();
        size += this.signature.getSize();
        return size;
    }



    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public byte[] serialize() {
        return GeneratorUtils.serialize((dataOutputStream) -> {
            dataOutputStream.writeLong(Long.reverseBytes((long) this.getVersion()));
            GeneratorUtils.writeEntity(dataOutputStream, this.signerPublicKey);
            GeneratorUtils.writeEntity(dataOutputStream, this.signature);
        });
    }
}


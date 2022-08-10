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
* Binary layout for an embedded account mosaic restriction transaction
**/
public class EmbeddedAccountMosaicRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {

    /** Account mosaic restriction transaction body. **/
    private final AccountMosaicRestrictionTransactionBodyBuilder accountMosaicRestrictionTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected EmbeddedAccountMosaicRestrictionTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.accountMosaicRestrictionTransactionBody = AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of EmbeddedAccountMosaicRestrictionTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of EmbeddedAccountMosaicRestrictionTransactionBuilder.
     */
    public static EmbeddedAccountMosaicRestrictionTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param signerPublicKey Entity signer's public key.
    * @param version Entity version.
    * @param network Entity network.
    * @param type Entity type.
    * @param restrictionFlags Account restriction flags.
    * @param restrictionAdditions Account restriction additions.
    * @param restrictionDeletions Account restriction deletions.
    */
    protected EmbeddedAccountMosaicRestrictionTransactionBuilder(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, EnumSet<AccountRestrictionFlagsDto> restrictionFlags, List<UnresolvedMosaicIdDto> restrictionAdditions, List<UnresolvedMosaicIdDto> restrictionDeletions) {
        super(signerPublicKey, version, network, type);
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(restrictionFlags, "restrictionFlags is null");
        GeneratorUtils.notNull(restrictionAdditions, "restrictionAdditions is null");
        GeneratorUtils.notNull(restrictionDeletions, "restrictionDeletions is null");
        this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    
    /**
     * Creates an instance of EmbeddedAccountMosaicRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     * @return Instance of EmbeddedAccountMosaicRestrictionTransactionBuilder.
     */
    public static EmbeddedAccountMosaicRestrictionTransactionBuilder create(KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, EnumSet<AccountRestrictionFlagsDto> restrictionFlags, List<UnresolvedMosaicIdDto> restrictionAdditions, List<UnresolvedMosaicIdDto> restrictionDeletions) {
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions);
    }

    /**
     * Gets account restriction flags.
     *
     * @return Account restriction flags.
     */
    public EnumSet<AccountRestrictionFlagsDto> getRestrictionFlags() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionFlags();
    }

    /**
     * Gets account restriction additions.
     *
     * @return Account restriction additions.
     */
    public List<UnresolvedMosaicIdDto> getRestrictionAdditions() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionAdditions();
    }

    /**
     * Gets account restriction deletions.
     *
     * @return Account restriction deletions.
     */
    public List<UnresolvedMosaicIdDto> getRestrictionDeletions() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionDeletions();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.accountMosaicRestrictionTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public AccountMosaicRestrictionTransactionBodyBuilder getBody() {
        return this.accountMosaicRestrictionTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.accountMosaicRestrictionTransactionBody);
        });
    }
}


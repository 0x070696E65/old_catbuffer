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
* Binary layout for a non-embedded account operation restriction transaction
**/
public class AccountOperationRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {

    /** Account operation restriction transaction body. **/
    private final AccountOperationRestrictionTransactionBodyBuilder accountOperationRestrictionTransactionBody;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AccountOperationRestrictionTransactionBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.accountOperationRestrictionTransactionBody = AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(stream);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AccountOperationRestrictionTransactionBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AccountOperationRestrictionTransactionBuilder.
     */
    public static AccountOperationRestrictionTransactionBuilder loadFromBinary(DataInputStream stream) {
        return new AccountOperationRestrictionTransactionBuilder(stream);
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
    * @param restrictionFlags Account restriction flags.
    * @param restrictionAdditions Account restriction additions.
    * @param restrictionDeletions Account restriction deletions.
    */
    protected AccountOperationRestrictionTransactionBuilder(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, EnumSet<AccountRestrictionFlagsDto> restrictionFlags, List<EntityTypeDto> restrictionAdditions, List<EntityTypeDto> restrictionDeletions) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        GeneratorUtils.notNull(signature, "signature is null");
        GeneratorUtils.notNull(signerPublicKey, "signerPublicKey is null");
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(network, "network is null");
        GeneratorUtils.notNull(type, "type is null");
        GeneratorUtils.notNull(fee, "fee is null");
        GeneratorUtils.notNull(deadline, "deadline is null");
        GeneratorUtils.notNull(restrictionFlags, "restrictionFlags is null");
        GeneratorUtils.notNull(restrictionAdditions, "restrictionAdditions is null");
        GeneratorUtils.notNull(restrictionDeletions, "restrictionDeletions is null");
        this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    
    /**
     * Creates an instance of AccountOperationRestrictionTransactionBuilder.
     *
     * @param signature Entity signature.
     * @param signerPublicKey Entity signer's public key.
     * @param version Entity version.
     * @param network Entity network.
     * @param type Entity type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param restrictionFlags Account restriction flags.
     * @param restrictionAdditions Account restriction additions.
     * @param restrictionDeletions Account restriction deletions.
     * @return Instance of AccountOperationRestrictionTransactionBuilder.
     */
    public static AccountOperationRestrictionTransactionBuilder create(SignatureDto signature, KeyDto signerPublicKey, byte version, NetworkTypeDto network, EntityTypeDto type, AmountDto fee, TimestampDto deadline, EnumSet<AccountRestrictionFlagsDto> restrictionFlags, List<EntityTypeDto> restrictionAdditions, List<EntityTypeDto> restrictionDeletions) {
        return new AccountOperationRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions);
    }

    /**
     * Gets account restriction flags.
     *
     * @return Account restriction flags.
     */
    public EnumSet<AccountRestrictionFlagsDto> getRestrictionFlags() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionFlags();
    }

    /**
     * Gets account restriction additions.
     *
     * @return Account restriction additions.
     */
    public List<EntityTypeDto> getRestrictionAdditions() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionAdditions();
    }

    /**
     * Gets account restriction deletions.
     *
     * @return Account restriction deletions.
     */
    public List<EntityTypeDto> getRestrictionDeletions() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionDeletions();
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.accountOperationRestrictionTransactionBody.getSize();
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    @Override
    public AccountOperationRestrictionTransactionBodyBuilder getBody() {
        return this.accountOperationRestrictionTransactionBody;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.accountOperationRestrictionTransactionBody);
        });
    }
}


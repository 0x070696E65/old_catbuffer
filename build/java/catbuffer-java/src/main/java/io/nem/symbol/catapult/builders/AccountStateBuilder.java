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
* Binary layout for non-historical account state
**/
public class AccountStateBuilder extends StateHeaderBuilder implements Serializer {

    /** Address of account. **/
    private final AddressDto address;

    /** Height at which address has been obtained. **/
    private final HeightDto addressHeight;

    /** Public key of account. **/
    private final KeyDto publicKey;

    /** Height at which public key has been obtained. **/
    private final HeightDto publicKeyHeight;

    /** Type of account. **/
    private final AccountTypeDto accountType;

    /** Account format. **/
    private final AccountStateFormatDto format;

    /** Mask of supplemental public key flags. **/
    private final EnumSet<AccountKeyTypeFlagsDto> supplementalPublicKeysMask;

    /** Linked account public key. **/
    private KeyDto linkedPublicKey;

    /** Node public key. **/
    private KeyDto nodePublicKey;

    /** Vrf public key. **/
    private KeyDto vrfPublicKey;

    /** Voting public keys. **/
    private final List<PinnedVotingKeyBuilder> votingPublicKeys;

    /** Current importance snapshot of the account. **/
    private ImportanceSnapshotBuilder importanceSnapshots;

    /** Activity buckets of the account. **/
    private HeightActivityBucketsBuilder activityBuckets;

    /** Balances of account. **/
    private final List<MosaicBuilder> balances;

    /**
     * Constructor - Creates an object from stream.
     *
     * @param stream Byte stream to use to serialize the object.
     */
    protected AccountStateBuilder(DataInputStream stream) {
        super(stream);
        try {
            this.address = AddressDto.loadFromBinary(stream);
            this.addressHeight = HeightDto.loadFromBinary(stream);
            this.publicKey = KeyDto.loadFromBinary(stream);
            this.publicKeyHeight = HeightDto.loadFromBinary(stream);
            this.accountType = AccountTypeDto.loadFromBinary(stream);
            this.format = AccountStateFormatDto.loadFromBinary(stream);
            this.supplementalPublicKeysMask = GeneratorUtils.toSet(AccountKeyTypeFlagsDto.class, stream.readByte());
            final byte votingPublicKeysCount = stream.readByte();
            if (this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.LINKED)) {
                this.linkedPublicKey = KeyDto.loadFromBinary(stream);
            }
            if (this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.NODE)) {
                this.nodePublicKey = KeyDto.loadFromBinary(stream);
            }
            if (this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.VRF)) {
                this.vrfPublicKey = KeyDto.loadFromBinary(stream);
            }
            this.votingPublicKeys = GeneratorUtils.loadFromBinaryArray(PinnedVotingKeyBuilder::loadFromBinary, stream, votingPublicKeysCount, 0);
            if (this.format == AccountStateFormatDto.HIGH_VALUE) {
                this.importanceSnapshots = ImportanceSnapshotBuilder.loadFromBinary(stream);
            }
            if (this.format == AccountStateFormatDto.HIGH_VALUE) {
                this.activityBuckets = HeightActivityBucketsBuilder.loadFromBinary(stream);
            }
            final short balancesCount = Short.reverseBytes(stream.readShort());
            this.balances = GeneratorUtils.loadFromBinaryArray(MosaicBuilder::loadFromBinary, stream, balancesCount, 0);
        } catch (Exception e) {
            throw GeneratorUtils.getExceptionToPropagate(e);
        }
    }

    /**
     * Creates an instance of AccountStateBuilder from a stream.
     *
     * @param stream Byte stream to use to serialize the object.
     * @return Instance of AccountStateBuilder.
     */
    public static AccountStateBuilder loadFromBinary(DataInputStream stream) {
        return new AccountStateBuilder(stream);
    }
    
    /**
    * Constructor.
    *
    * @param version Serialization version.
    * @param address Address of account.
    * @param addressHeight Height at which address has been obtained.
    * @param publicKey Public key of account.
    * @param publicKeyHeight Height at which public key has been obtained.
    * @param accountType Type of account.
    * @param format Account format.
    * @param supplementalPublicKeysMask Mask of supplemental public key flags.
    * @param linkedPublicKey Linked account public key.
    * @param nodePublicKey Node public key.
    * @param vrfPublicKey Vrf public key.
    * @param votingPublicKeys Voting public keys.
    * @param importanceSnapshots Current importance snapshot of the account.
    * @param activityBuckets Activity buckets of the account.
    * @param balances Balances of account.
    */
    protected AccountStateBuilder(short version, AddressDto address, HeightDto addressHeight, KeyDto publicKey, HeightDto publicKeyHeight, AccountTypeDto accountType, AccountStateFormatDto format, EnumSet<AccountKeyTypeFlagsDto> supplementalPublicKeysMask, KeyDto linkedPublicKey, KeyDto nodePublicKey, KeyDto vrfPublicKey, List<PinnedVotingKeyBuilder> votingPublicKeys, ImportanceSnapshotBuilder importanceSnapshots, HeightActivityBucketsBuilder activityBuckets, List<MosaicBuilder> balances) {
        super(version);
        GeneratorUtils.notNull(version, "version is null");
        GeneratorUtils.notNull(address, "address is null");
        GeneratorUtils.notNull(addressHeight, "addressHeight is null");
        GeneratorUtils.notNull(publicKey, "publicKey is null");
        GeneratorUtils.notNull(publicKeyHeight, "publicKeyHeight is null");
        GeneratorUtils.notNull(accountType, "accountType is null");
        GeneratorUtils.notNull(format, "format is null");
        GeneratorUtils.notNull(supplementalPublicKeysMask, "supplementalPublicKeysMask is null");
        if (supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.LINKED)) {
            GeneratorUtils.notNull(linkedPublicKey, "linkedPublicKey is null");
        }
        if (supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.NODE)) {
            GeneratorUtils.notNull(nodePublicKey, "nodePublicKey is null");
        }
        if (supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.VRF)) {
            GeneratorUtils.notNull(vrfPublicKey, "vrfPublicKey is null");
        }
        GeneratorUtils.notNull(votingPublicKeys, "votingPublicKeys is null");
        if (format == AccountStateFormatDto.HIGH_VALUE) {
            GeneratorUtils.notNull(importanceSnapshots, "importanceSnapshots is null");
        }
        if (format == AccountStateFormatDto.HIGH_VALUE) {
            GeneratorUtils.notNull(activityBuckets, "activityBuckets is null");
        }
        GeneratorUtils.notNull(balances, "balances is null");
        this.address = address;
        this.addressHeight = addressHeight;
        this.publicKey = publicKey;
        this.publicKeyHeight = publicKeyHeight;
        this.accountType = accountType;
        this.format = format;
        this.supplementalPublicKeysMask = supplementalPublicKeysMask;
        this.linkedPublicKey = linkedPublicKey;
        this.nodePublicKey = nodePublicKey;
        this.vrfPublicKey = vrfPublicKey;
        this.votingPublicKeys = votingPublicKeys;
        this.importanceSnapshots = importanceSnapshots;
        this.activityBuckets = activityBuckets;
        this.balances = balances;
    }
    
    /**
     * Creates an instance of AccountStateBuilder.
     *
     * @param version Serialization version.
     * @param address Address of account.
     * @param addressHeight Height at which address has been obtained.
     * @param publicKey Public key of account.
     * @param publicKeyHeight Height at which public key has been obtained.
     * @param accountType Type of account.
     * @param supplementalPublicKeysMask Mask of supplemental public key flags.
     * @param linkedPublicKey Linked account public key.
     * @param nodePublicKey Node public key.
     * @param vrfPublicKey Vrf public key.
     * @param votingPublicKeys Voting public keys.
     * @param balances Balances of account.
     * @return Instance of AccountStateBuilder.
     */
    public static AccountStateBuilder createRegular(short version, AddressDto address, HeightDto addressHeight, KeyDto publicKey, HeightDto publicKeyHeight, AccountTypeDto accountType, EnumSet<AccountKeyTypeFlagsDto> supplementalPublicKeysMask, KeyDto linkedPublicKey, KeyDto nodePublicKey, KeyDto vrfPublicKey, List<PinnedVotingKeyBuilder> votingPublicKeys, List<MosaicBuilder> balances) {
        AccountStateFormatDto format = AccountStateFormatDto.REGULAR;
        return new AccountStateBuilder(version, address, addressHeight, publicKey, publicKeyHeight, accountType, format, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, null, null, balances);
    }
    
    /**
     * Creates an instance of AccountStateBuilder.
     *
     * @param version Serialization version.
     * @param address Address of account.
     * @param addressHeight Height at which address has been obtained.
     * @param publicKey Public key of account.
     * @param publicKeyHeight Height at which public key has been obtained.
     * @param accountType Type of account.
     * @param supplementalPublicKeysMask Mask of supplemental public key flags.
     * @param linkedPublicKey Linked account public key.
     * @param nodePublicKey Node public key.
     * @param vrfPublicKey Vrf public key.
     * @param votingPublicKeys Voting public keys.
     * @param importanceSnapshots Current importance snapshot of the account.
     * @param activityBuckets Activity buckets of the account.
     * @param balances Balances of account.
     * @return Instance of AccountStateBuilder.
     */
    public static AccountStateBuilder createHighValue(short version, AddressDto address, HeightDto addressHeight, KeyDto publicKey, HeightDto publicKeyHeight, AccountTypeDto accountType, EnumSet<AccountKeyTypeFlagsDto> supplementalPublicKeysMask, KeyDto linkedPublicKey, KeyDto nodePublicKey, KeyDto vrfPublicKey, List<PinnedVotingKeyBuilder> votingPublicKeys, ImportanceSnapshotBuilder importanceSnapshots, HeightActivityBucketsBuilder activityBuckets, List<MosaicBuilder> balances) {
        AccountStateFormatDto format = AccountStateFormatDto.HIGH_VALUE;
        return new AccountStateBuilder(version, address, addressHeight, publicKey, publicKeyHeight, accountType, format, supplementalPublicKeysMask, linkedPublicKey, nodePublicKey, vrfPublicKey, votingPublicKeys, importanceSnapshots, activityBuckets, balances);
    }

    /**
     * Gets address of account.
     *
     * @return Address of account.
     */
    public AddressDto getAddress() {
        return this.address;
    }

    /**
     * Gets height at which address has been obtained.
     *
     * @return Height at which address has been obtained.
     */
    public HeightDto getAddressHeight() {
        return this.addressHeight;
    }

    /**
     * Gets public key of account.
     *
     * @return Public key of account.
     */
    public KeyDto getPublicKey() {
        return this.publicKey;
    }

    /**
     * Gets height at which public key has been obtained.
     *
     * @return Height at which public key has been obtained.
     */
    public HeightDto getPublicKeyHeight() {
        return this.publicKeyHeight;
    }

    /**
     * Gets type of account.
     *
     * @return Type of account.
     */
    public AccountTypeDto getAccountType() {
        return this.accountType;
    }

    /**
     * Gets account format.
     *
     * @return Account format.
     */
    public AccountStateFormatDto getFormat() {
        return this.format;
    }

    /**
     * Gets mask of supplemental public key flags.
     *
     * @return Mask of supplemental public key flags.
     */
    public EnumSet<AccountKeyTypeFlagsDto> getSupplementalPublicKeysMask() {
        return this.supplementalPublicKeysMask;
    }

    /**
     * Gets linked account public key.
     *
     * @return Linked account public key.
     */
    public KeyDto getLinkedPublicKey() {
        if (!(this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.LINKED))) {
            throw new java.lang.IllegalStateException("supplementalPublicKeysMask is not set to LINKED.");
        }
        return this.linkedPublicKey;
    }

    /**
     * Gets node public key.
     *
     * @return Node public key.
     */
    public KeyDto getNodePublicKey() {
        if (!(this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.NODE))) {
            throw new java.lang.IllegalStateException("supplementalPublicKeysMask is not set to NODE.");
        }
        return this.nodePublicKey;
    }

    /**
     * Gets vrf public key.
     *
     * @return Vrf public key.
     */
    public KeyDto getVrfPublicKey() {
        if (!(this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.VRF))) {
            throw new java.lang.IllegalStateException("supplementalPublicKeysMask is not set to VRF.");
        }
        return this.vrfPublicKey;
    }

    /**
     * Gets voting public keys.
     *
     * @return Voting public keys.
     */
    public List<PinnedVotingKeyBuilder> getVotingPublicKeys() {
        return this.votingPublicKeys;
    }

    /**
     * Gets current importance snapshot of the account.
     *
     * @return Current importance snapshot of the account.
     */
    public ImportanceSnapshotBuilder getImportanceSnapshots() {
        if (!(this.format == AccountStateFormatDto.HIGH_VALUE)) {
            throw new java.lang.IllegalStateException("format is not set to HIGH_VALUE.");
        }
        return this.importanceSnapshots;
    }

    /**
     * Gets activity buckets of the account.
     *
     * @return Activity buckets of the account.
     */
    public HeightActivityBucketsBuilder getActivityBuckets() {
        if (!(this.format == AccountStateFormatDto.HIGH_VALUE)) {
            throw new java.lang.IllegalStateException("format is not set to HIGH_VALUE.");
        }
        return this.activityBuckets;
    }

    /**
     * Gets balances of account.
     *
     * @return Balances of account.
     */
    public List<MosaicBuilder> getBalances() {
        return this.balances;
    }


    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public int getSize() {
        int size = super.getSize();
        size += this.address.getSize();
        size += this.addressHeight.getSize();
        size += this.publicKey.getSize();
        size += this.publicKeyHeight.getSize();
        size += this.accountType.getSize();
        size += this.format.getSize();
        size += AccountKeyTypeFlagsDto.values()[0].getSize();
        size += 1; // votingPublicKeysCount
        if (this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.LINKED)) {
            size += this.linkedPublicKey.getSize();
        }
        if (this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.NODE)) {
            size += this.nodePublicKey.getSize();
        }
        if (this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.VRF)) {
            size += this.vrfPublicKey.getSize();
        }
        size +=  GeneratorUtils.getSumSize(this.votingPublicKeys, 0);
        if (this.format == AccountStateFormatDto.HIGH_VALUE) {
            size += this.importanceSnapshots.getSize();
        }
        if (this.format == AccountStateFormatDto.HIGH_VALUE) {
            size += this.activityBuckets.getSize();
        }
        size += 2; // balancesCount
        size +=  GeneratorUtils.getSumSize(this.balances, 0);
        return size;
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
            GeneratorUtils.writeEntity(dataOutputStream, this.address);
            GeneratorUtils.writeEntity(dataOutputStream, this.addressHeight);
            GeneratorUtils.writeEntity(dataOutputStream, this.publicKey);
            GeneratorUtils.writeEntity(dataOutputStream, this.publicKeyHeight);
            GeneratorUtils.writeEntity(dataOutputStream, this.accountType);
            GeneratorUtils.writeEntity(dataOutputStream, this.format);
            dataOutputStream.writeByte((byte) GeneratorUtils.toLong(AccountKeyTypeFlagsDto.class, this.supplementalPublicKeysMask));
            dataOutputStream.writeByte((byte) GeneratorUtils.getSize(this.getVotingPublicKeys()));
            if (this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.LINKED)) {
                GeneratorUtils.writeEntity(dataOutputStream, this.linkedPublicKey);
            }
            if (this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.NODE)) {
                GeneratorUtils.writeEntity(dataOutputStream, this.nodePublicKey);
            }
            if (this.supplementalPublicKeysMask.contains(AccountKeyTypeFlagsDto.VRF)) {
                GeneratorUtils.writeEntity(dataOutputStream, this.vrfPublicKey);
            }
            GeneratorUtils.writeList(dataOutputStream, this.votingPublicKeys, 0);
            if (this.format == AccountStateFormatDto.HIGH_VALUE) {
                GeneratorUtils.writeEntity(dataOutputStream, this.importanceSnapshots);
            }
            if (this.format == AccountStateFormatDto.HIGH_VALUE) {
                GeneratorUtils.writeEntity(dataOutputStream, this.activityBuckets);
            }
            dataOutputStream.writeShort(Short.reverseBytes((short) GeneratorUtils.getSize(this.getBalances())));
            GeneratorUtils.writeList(dataOutputStream, this.balances, 0);
        });
    }
}


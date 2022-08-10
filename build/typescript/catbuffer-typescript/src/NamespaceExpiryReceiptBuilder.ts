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

import { GeneratorUtils } from './GeneratorUtils';
import { NamespaceIdDto } from './NamespaceIdDto';
import { ReceiptBuilder, ReceiptBuilderParams } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of NamespaceExpiryReceiptBuilder.
 */
export interface NamespaceExpiryReceiptBuilderParams extends ReceiptBuilderParams {
    /** Expiring namespace id. **/
    artifactId: NamespaceIdDto;
}

/**
 * Binary layout for a namespace expiry receipt
 **/
export class NamespaceExpiryReceiptBuilder extends ReceiptBuilder implements Serializer {
    /** Expiring namespace id. **/
    public readonly artifactId: NamespaceIdDto;

    /**
     * Constructor.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param artifactId Expiring namespace id.
     */
    public constructor({ version, type, artifactId }: NamespaceExpiryReceiptBuilderParams) {
        super({ version, type });
        GeneratorUtils.notNull(artifactId, 'artifactId is null or undefined');
        this.artifactId = artifactId;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): NamespaceExpiryReceiptBuilder {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.size);
        const artifactId: NamespaceIdDto = NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, artifactId.size);
        return new NamespaceExpiryReceiptBuilder({ version: superObject.version, type: superObject.type, artifactId: artifactId });
    }

    /**
     * Creates an instance of NamespaceExpiryReceiptBuilder.
     *
     * @param version Receipt version.
     * @param type Receipt type.
     * @param artifactId Expiring namespace id.
     * @return Instance of NamespaceExpiryReceiptBuilder.
     */
    public static createNamespaceExpiryReceiptBuilder(
        version: number,
        type: ReceiptTypeDto,
        artifactId: NamespaceIdDto,
    ): NamespaceExpiryReceiptBuilder {
        return new NamespaceExpiryReceiptBuilder({ version: version, type: type, artifactId: artifactId });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = super.size;
        size += this.artifactId.size; // artifactId
        return size;
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
        const artifactIdBytes = this.artifactId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, artifactIdBytes);
        return newArray;
    }
}

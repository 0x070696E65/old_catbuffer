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

import { BlockDurationDto } from './BlockDurationDto';
import { GeneratorUtils } from './GeneratorUtils';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { Serializer } from './Serializer';

/**
 *  Interface to create instances of NamespaceRegistrationTransactionBodyBuilder.
 */
export interface NamespaceRegistrationTransactionBodyBuilderParams {
    /** Namespace duration. **/
    duration?: BlockDurationDto;
    /** Parent namespace identifier. **/
    parentId?: NamespaceIdDto;
    /** Namespace identifier. **/
    id: NamespaceIdDto;
    /** Namespace registration type. **/
    registrationType: NamespaceRegistrationTypeDto;
    /** Namespace name. **/
    name: Uint8Array;
}

/**
 * Binary layout for a namespace registration transaction
 **/
export class NamespaceRegistrationTransactionBodyBuilder implements Serializer {
    /** Namespace duration. **/
    public readonly duration?: BlockDurationDto;

    /** Parent namespace identifier. **/
    public readonly parentId?: NamespaceIdDto;

    /** Namespace identifier. **/
    public readonly id: NamespaceIdDto;

    /** Namespace registration type. **/
    public readonly registrationType: NamespaceRegistrationTypeDto;

    /** Namespace name. **/
    public readonly name: Uint8Array;

    /**
     * Constructor.
     *
     * @param duration Namespace duration.
     * @param parentId Parent namespace identifier.
     * @param id Namespace identifier.
     * @param registrationType Namespace registration type.
     * @param name Namespace name.
     */
    public constructor({ duration, parentId, id, registrationType, name }: NamespaceRegistrationTransactionBodyBuilderParams) {
        if (registrationType === NamespaceRegistrationTypeDto.ROOT) {
            GeneratorUtils.notNull(duration, 'duration is null or undefined');
        }
        if (registrationType === NamespaceRegistrationTypeDto.CHILD) {
            GeneratorUtils.notNull(parentId, 'parentId is null or undefined');
        }
        GeneratorUtils.notNull(id, 'id is null or undefined');
        GeneratorUtils.notNull(registrationType, 'registrationType is null or undefined');
        GeneratorUtils.notNull(name, 'name is null or undefined');
        this.duration = duration;
        this.parentId = parentId;
        this.id = id;
        this.registrationType = registrationType;
        this.name = name;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): NamespaceRegistrationTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const registrationTypeCondition = GeneratorUtils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const id: NamespaceIdDto = NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const registrationType: NamespaceRegistrationTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const nameSize: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const name: Uint8Array = GeneratorUtils.getBytes(Uint8Array.from(byteArray), nameSize);
        byteArray.splice(0, nameSize);
        let duration: BlockDurationDto | undefined = undefined;
        if (registrationType === NamespaceRegistrationTypeDto.ROOT) {
            duration = new BlockDurationDto(registrationTypeCondition);
        }
        let parentId: NamespaceIdDto | undefined = undefined;
        if (registrationType === NamespaceRegistrationTypeDto.CHILD) {
            parentId = new NamespaceIdDto(registrationTypeCondition);
        }
        return new NamespaceRegistrationTransactionBodyBuilder({
            duration: duration,
            parentId: parentId,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }

    /**
     * Creates an instance of NamespaceRegistrationTransactionBodyBuilder.
     *
     * @param duration Namespace duration.
     * @param id Namespace identifier.
     * @param name Namespace name.
     * @return Instance of NamespaceRegistrationTransactionBodyBuilder.
     */
    public static createNamespaceRegistrationTransactionBodyBuilderRoot(
        duration: BlockDurationDto,
        id: NamespaceIdDto,
        name: Uint8Array,
    ): NamespaceRegistrationTransactionBodyBuilder {
        const registrationType = NamespaceRegistrationTypeDto.ROOT;
        return new NamespaceRegistrationTransactionBodyBuilder({
            duration: duration,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }

    /**
     * Creates an instance of NamespaceRegistrationTransactionBodyBuilder.
     *
     * @param parentId Parent namespace identifier.
     * @param id Namespace identifier.
     * @param name Namespace name.
     * @return Instance of NamespaceRegistrationTransactionBodyBuilder.
     */
    public static createNamespaceRegistrationTransactionBodyBuilderChild(
        parentId: NamespaceIdDto,
        id: NamespaceIdDto,
        name: Uint8Array,
    ): NamespaceRegistrationTransactionBodyBuilder {
        const registrationType = NamespaceRegistrationTypeDto.CHILD;
        return new NamespaceRegistrationTransactionBodyBuilder({
            parentId: parentId,
            id: id,
            registrationType: registrationType,
            name: name,
        });
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        let size = 0;
        if (this.registrationType === NamespaceRegistrationTypeDto.ROOT) {
            size += this.duration!.size; // duration
        }
        if (this.registrationType === NamespaceRegistrationTypeDto.CHILD) {
            size += this.parentId!.size; // parentId
        }
        size += this.id.size; // id
        size += 1; // registrationType
        size += 1; // nameSize
        size += this.name.length; // name
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        if (this.registrationType === NamespaceRegistrationTypeDto.ROOT) {
            const durationBytes = this.duration!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        }
        if (this.registrationType === NamespaceRegistrationTypeDto.CHILD) {
            const parentIdBytes = this.parentId!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, parentIdBytes);
        }
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const registrationTypeBytes = GeneratorUtils.uint8ToBuffer(this.registrationType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, registrationTypeBytes);
        const nameSizeBytes = GeneratorUtils.uint8ToBuffer(this.name.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, nameSizeBytes);
        const nameBytes = this.name;
        newArray = GeneratorUtils.concatTypedArrays(newArray, nameBytes);
        return newArray;
    }
}

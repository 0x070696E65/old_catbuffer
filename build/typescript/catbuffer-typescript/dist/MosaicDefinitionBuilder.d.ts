import { AddressDto } from './AddressDto';
import { HeightDto } from './HeightDto';
import { MosaicPropertiesBuilder } from './MosaicPropertiesBuilder';
import { Serializer } from './Serializer';
export interface MosaicDefinitionBuilderParams {
    startHeight: HeightDto;
    ownerAddress: AddressDto;
    revision: number;
    properties: MosaicPropertiesBuilder;
}
export declare class MosaicDefinitionBuilder implements Serializer {
    readonly startHeight: HeightDto;
    readonly ownerAddress: AddressDto;
    readonly revision: number;
    readonly properties: MosaicPropertiesBuilder;
    constructor({ startHeight, ownerAddress, revision, properties }: MosaicDefinitionBuilderParams);
    static loadFromBinary(payload: Uint8Array): MosaicDefinitionBuilder;
    static createMosaicDefinitionBuilder(startHeight: HeightDto, ownerAddress: AddressDto, revision: number, properties: MosaicPropertiesBuilder): MosaicDefinitionBuilder;
    get size(): number;
    serialize(): Uint8Array;
}

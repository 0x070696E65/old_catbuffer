import { EmbeddedTransactionBuilder, EmbeddedTransactionBuilderParams } from './EmbeddedTransactionBuilder';
import { EntityTypeDto } from './EntityTypeDto';
import { FinalizationEpochDto } from './FinalizationEpochDto';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { VotingKeyDto } from './VotingKeyDto';
import { VotingKeyLinkTransactionBodyBuilder } from './VotingKeyLinkTransactionBodyBuilder';
export interface EmbeddedVotingKeyLinkTransactionBuilderParams extends EmbeddedTransactionBuilderParams {
    linkedPublicKey: VotingKeyDto;
    startEpoch: FinalizationEpochDto;
    endEpoch: FinalizationEpochDto;
    linkAction: LinkActionDto;
}
export declare class EmbeddedVotingKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.VOTING_KEY_LINK_TRANSACTION;
    readonly votingKeyLinkTransactionBody: VotingKeyLinkTransactionBodyBuilder;
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, startEpoch, endEpoch, linkAction, }: EmbeddedVotingKeyLinkTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): EmbeddedVotingKeyLinkTransactionBuilder;
    static createEmbeddedVotingKeyLinkTransactionBuilder(signerPublicKey: KeyDto, network: NetworkTypeDto, linkedPublicKey: VotingKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto, linkAction: LinkActionDto): EmbeddedVotingKeyLinkTransactionBuilder;
    get linkedPublicKey(): VotingKeyDto;
    get startEpoch(): FinalizationEpochDto;
    get endEpoch(): FinalizationEpochDto;
    get linkAction(): LinkActionDto;
    get size(): number;
    get body(): VotingKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}

import { AmountDto } from './AmountDto';
import { EntityTypeDto } from './EntityTypeDto';
import { FinalizationEpochDto } from './FinalizationEpochDto';
import { KeyDto } from './KeyDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder, TransactionBuilderParams } from './TransactionBuilder';
import { VotingKeyDto } from './VotingKeyDto';
import { VotingKeyLinkTransactionBodyBuilder } from './VotingKeyLinkTransactionBodyBuilder';
export interface VotingKeyLinkTransactionBuilderParams extends TransactionBuilderParams {
    linkedPublicKey: VotingKeyDto;
    startEpoch: FinalizationEpochDto;
    endEpoch: FinalizationEpochDto;
    linkAction: LinkActionDto;
}
export declare class VotingKeyLinkTransactionBuilder extends TransactionBuilder implements Serializer {
    static readonly VERSION = 1;
    static readonly ENTITY_TYPE = EntityTypeDto.VOTING_KEY_LINK_TRANSACTION;
    readonly votingKeyLinkTransactionBody: VotingKeyLinkTransactionBodyBuilder;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, startEpoch, endEpoch, linkAction, }: VotingKeyLinkTransactionBuilderParams);
    static loadFromBinary(payload: Uint8Array): VotingKeyLinkTransactionBuilder;
    static createVotingKeyLinkTransactionBuilder(signature: SignatureDto, signerPublicKey: KeyDto, network: NetworkTypeDto, fee: AmountDto, deadline: TimestampDto, linkedPublicKey: VotingKeyDto, startEpoch: FinalizationEpochDto, endEpoch: FinalizationEpochDto, linkAction: LinkActionDto): VotingKeyLinkTransactionBuilder;
    get linkedPublicKey(): VotingKeyDto;
    get startEpoch(): FinalizationEpochDto;
    get endEpoch(): FinalizationEpochDto;
    get linkAction(): LinkActionDto;
    get size(): number;
    get body(): VotingKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}

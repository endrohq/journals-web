export type LiskAccount = {
  address: string;
  passphrase?: string;
  dpos?: DPoS;
  keys: AccountKeys;
  token?: Token;
  sequence?: Sequence;
};

export interface DPoS {
  delegate: Delegate;
  sentVotes: string[];
  unlocking: [];
}

export interface Delegate {
  username: string;
  pomHeights: number[];
  consecutiveMissedBlocks: number;
  lastForgedHeight: number;
  totalVotesReceived: string;
  isBanned: boolean;
}

export interface AccountKeys {
  numberOfSignatures?: number;
  mandatoryKeys?: number[];
  optionalKeys?: number[];
  publicKey: string;
  privateKey: string;
}

export interface Token {
  balance: string;
}

export interface Sequence {
  nonce: string;
}

type Meta = {
  count: number;
  limit: number;
  offset: number;
};

export type ApiResponseModel<T> = {
  meta: Meta;
  data: T;
};

export type Transaction<T> = {
  moduleID: number;
  assetID: number;
  nonce: number;
  fee: number;
  senderPublicKey: any;
  signatures: string[];
  asset: T;
};

export type BaseTransaction = {};

export type BlockModel = {
  header: BlockHeader;
  payload: Transaction<BaseTransaction>[];
};

export type BlockHeader = {
  id: string;
  height: number;
  version: number;
  timestamp: number;
  previousBlockID: any;
  transactionRoot: any;
  generatorPublicKey: any;
  reward: number;
  asset: any;
  signature: any;
};

export interface Transfer extends BaseTransaction {
  amount: number;
  recipientAddress: number;
  data: string;
}

export interface RegisterDelegate extends BaseTransaction {
  username: string;
}

export interface DelegateVote extends BaseTransaction {
  votes: Vote[];
}

export interface Vote extends BaseTransaction {
  delegateAddress: any[];
  amount: number;
}

export interface UnlockToken extends BaseTransaction {
  unlockObjects: UnlockObject[];
}

export interface UnlockObject extends BaseTransaction {
  delegateAddress: any[];
  amount: number;
  unvoteHeight: number;
}

export interface RegisterMultiSignatureGroup extends BaseTransaction {
  numberOfSignatures: number;
  mandatoryKeys: any[];
  optionalKeys: any[];
}

export interface ReportDelegateMisbehaviour extends BaseTransaction {
  header1: BlockHeader;
  header2: BlockHeader;
}

export type TokenModule = {
  0: Transfer;
};

export type KeysModule = {
  0: RegisterMultiSignatureGroup;
};

export type DposModule = {
  0: RegisterDelegate;
  1: DelegateVote;
  2: UnlockToken;
  3: ReportDelegateMisbehaviour;
};

export type Module = TokenModule | KeysModule | DposModule;

export type Dictionary = {
  [id: number]: Module;
};

export class ModuleDictionary {
  modules: Record<number, Module>;

  register(moduleID: number, module: Module) {}

  get(payload: Transaction<BaseTransaction>) {
    if (payload.moduleID === 2) {
      return payload as Transaction<Transfer>;
    } else if (payload.moduleID === 4) {
      return payload as Transaction<Transfer>;
    } else if (payload.moduleID === 5) {
      return payload as Transaction<Transfer>;
    } else {
      return payload;
    }
  }
}

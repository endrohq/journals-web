import { LiskAccount } from '@lisk-react/types';
import { ModalProps, ModalType } from '../components/modals';

export interface NewsEvent {
  id: string;
  title: string;
  createdBy: string;
  dateCreated: bigint;
  dateUpdated: bigint;
  labelStats: Record<string, number>;
  activity: NewsEventActivity[];
  treasury: NewsEventTreasury;
}

export interface SupportedEvent {
  eventId: string;
  address: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    count: number;
    offset: number;
    total: number;
  };
}

export interface InputError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: InputError;
}

export interface ValidatorInput {
  value: any;
  exists?(value: any): void;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  valid?: boolean;
  label?: string;
  ref?: any;
  prefix?: string;
  suffix?: string;
}

export interface Subscription {
  id: string;
  address: string;
  expiresAt: number;
  startsAt: number;
}

export interface Treasury {
  account: LiskAccount;
  rounds: TreasuryRound[];
  currentRound: number;
  currentRoundFunds: number;
  treasuryFunds: number;
  subscriptionCount: number;
  events: NewsEvent[];
}

export interface TreasuryRound {
  startsAt: number;
  endsAt: number;
  contributors: number;
}

export interface LongLat {
  longitude: number;
  latitude: number;
}

export interface OpenStreetLocation {
  x: number;
  y: number;
  label: string;
  bounds: number[][];
}

export interface ActiveModalContext {
  modalType: ModalType;
  data: ModalProps;
}

export interface NewsEventActivity {
  createdBy: string;
  transactionHash: string;
  transactionDate: bigint;
  type: NewsHistoryTypes;
  location: LongLat;
  media: NewsEventMedia[];
  statement: NewsEventStatement;
}

export interface ContextMetadata {
  entities: Entity[];
  verbs: string[];
}

export interface ContentMetadata {
  labels: string[];
  gps: OpenStreetLocation;
}

export interface NewsEventMedia {
  mediaId: string;
  description: string;
  entities: Entity[];
  verbs: string[];
  labels: string[];
}

export interface Entity {
  entity: string;
  entityType: string;
}

export interface UploadContext {
  cid: string;
  metadata?: ContentMetadata;
}

export enum NewsHistoryTypes {
  EVENT_CREATED = 'EVENT_CREATED',
  EVENT_UPDATED = 'EVENT_UPDATED'
}

export interface NewsEventStatement {
  entities: Entity[];
  verbs: string[];
  text: string;
}

export interface Entity {
  entity: string;
  entityType: string;
}

export interface NewsEventTreasury {
  supporters: number;
  funding: number;
}

export interface ContentItem {
  cid: string;
  name: string;
  path: string;
  size: string;
  isDir: boolean;
  items: ContentItem[];
  count: number;
  metadata: {
    updatedAt: number;
    roles: any;
  };
}

import { LiskAccount } from '@lisk-react/types';

export interface NewsEvent {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  supporters: number;
  funding: number;
  longitude: string;
  latitude: string;
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
  round: number;
  holdings: number;
  subscriptionCount: number;
  events: NewsEvent[];
}

export interface NewsEventLocation {
  longitude: number;
  latitude: number;
}

export interface OpenStreetLocation {
  x: number;
  y: number;
  label: string;
  bounds: number[][];
}

export interface UploadContext {
  labels: string[];
  videoId: string;
}

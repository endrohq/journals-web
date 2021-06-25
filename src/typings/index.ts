export interface NewsEvent {
  title: string;
  description: string;
  createdBy: string;
  id: string;
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

import { FC } from 'react';
import { TransferModal } from 'src/components/modals/TransferModal';
import { AccessDeniedModal } from 'src/components/modals/AccessDeniedModal';
import { Modal } from 'antd';
import { RegisterUsernameModal } from './RegisterUsernameModal';
import { TxConfirmAndProcessModal } from './TxConfirmAndProcessModal';
import { CreateEvent } from './CreateEventModal/CreateEvent';
import { useWallet } from '@lisk-react/use-lisk';
import { LongLat, OpenStreetLocation } from '../../typings';
import { LocationMapModal } from './LocationMapModal';
import { CreateSubscriptionModal } from './CreateSubscriptionModal';

export enum ModalType {
  ACCESS_DENIED = 'ACCESS_DENIED',
  CREATE_EVENT_CONTEXT = 'CREATE_EVENT_CONTEXT',
  CREATE_SUBSCRIPTION = 'CREATE_SUBSCRIPTION',
  LOCATION = 'LOCATION',
  REGISTER_USERNAME = 'REGISTER_USERNAME',
  TRANSACTION_CONFIRM = 'TRANSACTION_CONFIRM',
  TRANSFER = 'TRANSFER'
}

export type TransferProps = {
  from: string;
  to: string;
};

export type CreateEventProps = {
  ipfsPath: string;
  cid: string;
};

export type CreateSubscriptionProps = {
  refresh(): void;
};

export type LocationProps = {
  location: LongLat;
  openStreetLocation: OpenStreetLocation;
};

export type TxConfirmationProps = {
  transaction: Record<string, unknown>;
  transactionCost: number;
};

export type DataProps = TransferProps | TxConfirmationProps;

export type ModalProps<T = {}> = {
  onSubmit?(transaction?: Record<string, any>): void;
  close?(): void;
  shouldBeAuthenticated?: boolean;
  width?: string;
  data?: T;
};

export interface ActiveModalContext {
  modalType: ModalType;
  properties: ModalProps;
}

export interface Props {
  isOpen: boolean;
  activeModal: ActiveModalContext;
  close(): void;
}

const modals = {
  [ModalType.TRANSFER]: TransferModal,
  [ModalType.ACCESS_DENIED]: AccessDeniedModal,
  [ModalType.CREATE_SUBSCRIPTION]: CreateSubscriptionModal,
  [ModalType.LOCATION]: LocationMapModal,
  [ModalType.CREATE_EVENT_CONTEXT]: CreateEvent,
  [ModalType.REGISTER_USERNAME]: RegisterUsernameModal,
  [ModalType.TRANSACTION_CONFIRM]: TxConfirmAndProcessModal
};

export const UniversalModal: FC<Props> = ({ close, activeModal, isOpen }) => {
  const { isAuthenticated } = useWallet();

  if (!activeModal || !activeModal?.modalType) return <></>;
  const ActiveModal =
    activeModal?.properties?.shouldBeAuthenticated && !isAuthenticated
      ? modals[ModalType.ACCESS_DENIED]
      : modals[activeModal.modalType];
  return (
    <Modal
      width={activeModal?.properties?.width}
      footer={null}
      bodyStyle={{ padding: 0, margin: 0 }}
      onCancel={close}
      visible={isOpen}>
      <ActiveModal {...(activeModal.properties as any)} close={close} />
    </Modal>
  );
};

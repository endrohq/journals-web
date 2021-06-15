import { FC } from 'react';
import { TransferModal } from 'src/components/modals/TransferModal/TransferModal';
import { AccessDeniedModal } from 'src/components/modals/AccessDeniedModal';
import { Modal } from 'antd';
import { RegisterUsernameModal } from './RegisterUsernameModal';

export enum ModalType {
  TRANSFER = 'TRANSFER',
  ACCESS_DENIED = 'ACCESS_DENIED',
  REGISTER_USERNAME = 'REGISTER_USERNAME'
}

export type TransferProps = {
  from: string;
  to: string;
};

export type DataProps = TransferProps;

export type ModalProps<T = {}> = {
  onSubmit?(): void;
  close?(): void;
  data?: T;
};

export interface Props {
  modalProps: ModalProps;
  isOpen: boolean;
  modalType: ModalType;
  close(): void;
}

const modals = {
  [ModalType.TRANSFER]: TransferModal,
  [ModalType.ACCESS_DENIED]: AccessDeniedModal,
  [ModalType.REGISTER_USERNAME]: RegisterUsernameModal
};

export const UniversalModal: FC<Props> = ({
  close,
  modalType,
  isOpen,
  modalProps = {}
}) => {
  if (!modalType) return <></>;
  const ActiveModal = modals[modalType];
  return (
    <Modal
      footer={null}
      bodyStyle={{ padding: 0, margin: 0 }}
      onCancel={close}
      visible={isOpen}>
      <ActiveModal {...(modalProps as any)} close={close} />
    </Modal>
  );
};

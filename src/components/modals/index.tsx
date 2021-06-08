import { FC } from 'react';
import { TransferModal } from 'src/components/modals/TransferModal';
import { AccessDeniedModal } from 'src/components/modals/AccessDeniedModal';
import { Modal } from 'antd';

export enum ModalType {
  TRANSFER = 'TRANSFER',
  ACCESS_DENIED = 'ACCESS_DENIED'
}

export type TransferProps = {
  from: string;
  to: string;
};

export type DataProps = TransferProps;

export type ModalProps<T = {}> = {
  close?(): void;
  onSubmit?(): void;
  data: T;
};

export interface Props {
  modalProps: ModalProps;
  isOpen: boolean;
  modalType: ModalType;
  close(): void;
}

const modals = {
  [ModalType.TRANSFER]: TransferModal,
  [ModalType.ACCESS_DENIED]: AccessDeniedModal
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

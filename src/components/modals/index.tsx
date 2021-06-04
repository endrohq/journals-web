import { FC } from 'react';
import { TransferModal } from 'src/components/modals/TransferModal';
import { AccessDeniedModal } from 'src/components/modals/AccessDeniedModal';
import { Modal } from 'antd';

export enum ModalType {
  TRANSFER = 'TRANSFER',
  ACCESS_DENIED = 'ACCESS_DENIED'
}

export type ModalProps<T extends Record<string, unknown> = {}> = T & {
  close?(): void;
  onSubmit?(): void;
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
  const ActiveModal = modals[modalType];

  return (
    <Modal
      footer={null}
      bodyStyle={{ paddingTop: 30 }}
      onCancel={close}
      visible={isOpen}>
      <ActiveModal {...(modalProps as any)} closeModal={close} />
    </Modal>
  );
};

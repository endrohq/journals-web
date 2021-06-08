import React, { FC, useContext, useMemo, useState } from 'react';
import { ModalType, ModalProps } from '../components/modals';
import { DataProps } from '../components/modals';

export interface ModalContextStateProps {
  isOpen: boolean;
  openModal<T>(modal: ModalType, data?: ModalProps<T>): void;
  updateModal(data: DataProps): void;
  closeModal(): void;
  type: ModalType;
  modalProps: ModalProps;
}

export const ModalContext = React.createContext<ModalContextStateProps>(
  {} as ModalContextStateProps
);

export const useModal = () => useContext(ModalContext);

export const ModalContextProvider: FC = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>();
  const [modalProps, setModalProps] = useState<ModalProps>();

  function openModal<T>(type: ModalType, data?: ModalProps<T>) {
    setModalProps(data);
    setActiveModal(type);
  }

  function closeModal() {
    setModalProps(undefined);
    setActiveModal(undefined);
  }

  function updateModal(data: object) {
    setModalProps({ ...modalProps, ...data });
  }

  const isOpen = !!activeModal;

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
      updateModal,
      isOpen,
      type: activeModal,
      modalProps
    }),
    [isOpen, modalProps]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

import React, { FC, useContext, useMemo, useState } from 'react';
import { ModalType, ModalProps } from '../components/modals';

export interface ModalContextStateProps {
  isOpen: boolean;
  openModal<T>(modal: ModalType, data?: T): void;
  updateModal(data: object): void;
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

  function openModal(type: ModalType, data?: ModalProps) {
    setModalProps(data);
    setActiveModal(type);
  }

  function closeModal() {
    setActiveModal(undefined);
    setModalProps(undefined);
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

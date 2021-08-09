import React, { FC, useContext, useMemo, useState } from 'react';
import {
  ModalType,
  ModalProps,
  ActiveModalContext
} from '../components/modals';
import { DataProps } from '../components/modals';

export interface ModalContextStateProps {
  isOpen: boolean;
  openModal<T>(modal: ModalType, data?: ModalProps<T>): void;
  updateModal(data: DataProps): void;
  closeModal(): void;
  activeModal: ActiveModalContext;
}

export const ModalContext = React.createContext<ModalContextStateProps>(
  {} as ModalContextStateProps
);

export const useModal = () => useContext(ModalContext);

export const ModalContextProvider: FC = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ActiveModalContext>();

  async function openModal<T>(modalType: ModalType, data?: ModalProps<T>) {
    setActiveModal({
      modalType,
      properties: data
    });
  }

  function closeModal() {
    setActiveModal(undefined);
  }

  function updateModal(data: object) {
    setActiveModal({ ...activeModal, ...data });
  }

  const isOpen = !!activeModal;

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
      updateModal,
      isOpen,
      activeModal
    }),
    [isOpen, activeModal]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

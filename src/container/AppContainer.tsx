import * as React from 'react';
import { AppContainerHeader } from './AppContainerHeader';
import { UniversalModal } from '../components/modals';
import { useModal } from '../hooks/useModal';

interface ContainerProps {
  children: any;
}

export const AppContainer: React.FC<ContainerProps> = ({ children }) => {
  const { closeModal, isOpen, type, modalProps } = useModal();
  return (
    <>
      <AppContainerHeader />
      <div className="dashboard-content">{children}</div>
      <UniversalModal
        modalProps={modalProps}
        close={closeModal}
        isOpen={isOpen}
        modalType={type}
      />
    </>
  );
};

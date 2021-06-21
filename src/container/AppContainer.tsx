import * as React from 'react';
import { AppContainerHeader } from './AppContainerHeader';
import { UniversalModal } from '../components/modals';
import { useModal } from '../hooks/useModal';

interface ContainerProps {
  children: any;
}

export const AppContainer: React.FC<ContainerProps> = ({ children }) => {
  const { closeModal, isOpen, activeModal } = useModal();
  return (
    <>
      <AppContainerHeader />
      <div className="dashboard-content">{children}</div>
      <UniversalModal
        activeModal={activeModal}
        close={closeModal}
        isOpen={isOpen}
      />
    </>
  );
};

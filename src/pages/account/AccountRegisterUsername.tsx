import React from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { useWallet } from '@lisk-react/use-lisk';
import { ModalType } from '../../components/modals';
import { useModal } from '../../hooks/useModal';

interface ContainerProps {
  activeAddress: string;
  refresh(): void;
}

export const AccountRegisterUsername: React.FC<ContainerProps> = ({
  activeAddress,
  refresh
}) => {
  const { account } = useWallet();
  const { openModal } = useModal();

  if (account?.address !== activeAddress) {
    return <></>;
  }
  function openRegisterModal() {
    openModal(ModalType.REGISTER_USERNAME, {
      onSubmit: () => {
        refresh();
      }
    });
  }

  return (
    <div className="border border-danger bg-white flex-c mb25 rounded-1">
      <div className="fc-red bgc-light-red img--50 flex-c flex-jc-c">
        <WarningOutlined className="p0 m0 lh-none  " />
      </div>
      <div className="p5-15 w100 flex-c">
        <span className="fc-red">
          Your address has no username attached. Become more visible by
          registering a username!
        </span>
        <div className="ml-auto">
          <div className="click" onClick={() => openRegisterModal()}>
            Create username
          </div>
        </div>
      </div>
    </div>
  );
};

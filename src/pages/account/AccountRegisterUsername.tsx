import React from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { useLiskWallet } from '@lisk-react/use-lisk';
import { Button } from 'antd';
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
  const { account } = useLiskWallet();
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
    <div className="border border-danger bg-white flex-c p15-25 rounded-1">
      <div className="mr15 fs-xm fc-red bgc-light-red circle img--50 flex-c flex-jc-c">
        <WarningOutlined className="p0 m0 lh-none  " />
      </div>
      <span className="fc-red">
        Your address has no username attached. Become more visible by
        registering a username!
      </span>
      <div className="ml-auto">
        <Button type="primary" onClick={() => openRegisterModal()}>
          Create username
        </Button>
      </div>
    </div>
  );
};

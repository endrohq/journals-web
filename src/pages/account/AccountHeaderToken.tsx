import React from 'react';
import { LiskAccount } from '@lisk-react/types';
import { Button } from 'antd';
import { getFormattedNumber } from '../../utils/number.utils';
import { useModal } from 'src/hooks/useModal';
import { ModalType } from '../../components/modals';
import { TransferProps } from '../../components/modals';
import { ENV } from '../../env';
import { useWallet } from '@lisk-react/use-lisk';
import { ICONS } from '../../components/icons/Icons';

interface ContainerProps {
  account: LiskAccount;
}

export const AccountHeaderToken: React.FC<ContainerProps> = ({ account }) => {
  const { openModal } = useModal();
  const { isAuthenticated, account: activeAccount } = useWallet();

  function handleTransfer() {
    openModal<TransferProps>(ModalType.TRANSFER, {
      data: {
        from: '',
        to: account.address
      }
    });
  }

  return (
    <div className="p25">
      <div className="flex-column flex-fs">
        <div className="fc-gray-600 p0 m0 mb10">Balance</div>
        <div className="flex-c lh-none">
          <div className="mr25 p0 m0 fs-xl">{ICONS.TOKEN}</div>
          <div className="fs-xm fw-800 fc-black-500 ">
            {getFormattedNumber(account?.token?.balance || '0')} {ENV.TICKER}
          </div>
        </div>
      </div>
      <div className="mt25">
        <Button
          type="primary"
          onClick={handleTransfer}
          disabled={!isAuthenticated}
          block
          className="h40--fixed">
          Send {ENV.TICKER}{' '}
          {account?.address !== activeAccount?.address && 'here'}
        </Button>
      </div>
    </div>
  );
};

import React from 'react';
import { LiskAccount } from '@lisk-react/types';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { Button } from 'antd';
import { getFormattedNumber } from '../../utils/number.utils';
import { QuestionOutlined } from '@ant-design/icons';
import { useModal } from 'src/hooks/useModal';
import { ModalType } from '../../components/modals';
import { TransferProps } from '../../components/modals';

interface ContainerProps {
  account: LiskAccount;
}

export const AccountDetailsHeader: React.FC<ContainerProps> = ({ account }) => {
  const { openModal } = useModal();
  const isDelegate: boolean = !!account?.dpos?.delegate?.username;
  const type = isDelegate ? 'Delegate account' : 'Regular account';

  function handleTransfer() {
    openModal<TransferProps>(ModalType.TRANSFER, {
      data: {
        from: '',
        to: account.address
      }
    });
  }

  return (
    <div className="w100 flex-fs flex-column mb50">
      <div className="w100 flex-c mb15 pb15 border-bottom">
        <div className="img--100 pos-rel mr25">
          <div className="pos-abs">
            <LiskAvatar address={account?.address} size={100} />
          </div>
          {isDelegate && (
            <div className="pos-abs pos-br">
              <div className="circle bg-white flex-c flex-jc-c">
                <div className="img--30 circle m3 bgc-lblue fc-blue flex-c flex-jc-c">
                  <QuestionOutlined />
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="fs-xm fw-bold fc-black p0 m0">{account?.address}</div>
          <div className="flex-c">
            <div className="fc-grey fs-m p0 m0">{type}</div>
          </div>
        </div>
        <div className="ml-auto">
          <Button
            type="primary"
            onClick={handleTransfer}
            className="h40--fixed w175--fixed">
            Send LSK
          </Button>
        </div>
      </div>

      <div className="w100 flex-c grid-col6">
        {isDelegate && (
          <div className="flex-column flex-fs">
            <div className="fc-grey">Username</div>
            <div className="fs-m fw-bold fc-black">
              {account?.dpos?.delegate?.username}
            </div>
          </div>
        )}
        <div className="flex-column flex-fs">
          <div className="fc-grey">Balance</div>
          <div className="fs-m fw-bold fc-black">
            {getFormattedNumber(account?.token?.balance || '0')} ARCD
          </div>
        </div>
      </div>
    </div>
  );
};

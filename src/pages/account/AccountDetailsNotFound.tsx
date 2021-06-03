import React from 'react';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { WarningOutlined } from '@ant-design/icons';

interface ContainerProps {
  address: string;
}

export const AccountDetailsNotFound: React.FC<ContainerProps> = ({ address }) => {
  return (
    <div className="grid mt50">
      <div className="flex-c w100 mb25 pb15 br-b">
        <div className="mr25">
          <LiskAvatar address={address} size={100} />
        </div>
        <div className="ml25 fs-m">
          <span className="fw-bold fc-black">{address}</span>
        </div>
      </div>
      <div className="flex-c">
        <div className="mr15 fs-xm fc-red bgc-light-red circle img--50 flex-c flex-jc-c">
          <WarningOutlined className="p0 m0 lh-none" />
        </div>
        <span className="fc-red">This address has not been used yet or you have given an invalid address.</span>
      </div>
    </div>
  )
}

import React from 'react';
import { WarningOutlined } from '@ant-design/icons';

interface ContainerProps {
  address: string;
}

export const AccountNotFound: React.FC<ContainerProps> = () => {
  return (
    <div className="flex-c">
      <div className="mr15 fs-xm fc-red bgc-light-red circle img--50 flex-c flex-jc-c">
        <WarningOutlined className="p0 m0 lh-none" />
      </div>
      <span className="fc-red">
        This address has not been used yet or you have given an invalid address.
      </span>
    </div>
  );
};

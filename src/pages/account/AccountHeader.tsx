import React from 'react';
import { LiskAccount } from '@lisk-react/types';
import { AccountHeaderIdentity } from './AccountHeaderIdentity';
import { AccountHeaderToken } from './AccountHeaderToken';

interface ContainerProps {
  account: LiskAccount;
}

export const AccountHeader: React.FC<ContainerProps> = ({ account }) => (
  <div className="w100 rounded-1 border bg-white">
    <AccountHeaderIdentity account={account} />
    <AccountHeaderToken account={account} />
  </div>
);

import React from 'react';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { LiskAccount } from '@lisk-react/types';

interface ContainerProps {
  account: LiskAccount;
  selectedAccount: LiskAccount;
  setAccount(account: LiskAccount): void;
}

export const InitialiseAccountItem: React.FC<ContainerProps> = ({
  account,
  setAccount,
  selectedAccount
}) => {
  const publicKey = account.keys.publicKey;
  const shortenedPk =
    publicKey.substr(0, 4) +
    '...' +
    publicKey.substr(publicKey.length - 2, publicKey.length);
  const clazz =
    selectedAccount && selectedAccount.keys.publicKey === publicKey
      ? ' br5 bgc-xxl-grey shadow br-c-primary'
      : 'br-c-trans';
  return (
    <div
      onClick={() => setAccount(account)}
      className={`flex-c br flex-column click p15-25 ${clazz}`}>
      <LiskAvatar address={account.address} size={70} />
      <div className="mt15">
        <span className="fc-lb">{shortenedPk}</span>
      </div>
    </div>
  );
};

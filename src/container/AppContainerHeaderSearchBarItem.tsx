import React from 'react';
import { getAccountDetailsRoute } from '../shared/router/routes';
import { LiskAccount } from '@lisk-react/types';
import { AccountThumbnailCard } from '../components/account/AccountThumbnailCard';

interface ContainerProps {
  account: LiskAccount;
  navigate(uri: string): void;
}

export const AppContainerHeaderSearchBarItem: React.FC<ContainerProps> = ({
  account,
  navigate
}) => {
  const uri = getAccountDetailsRoute(account.address);
  return (
    <div
      onMouseDown={() => navigate(uri)}
      className="w100 h100 flex flex-jc-fs flex-ai-c p5">
      <AccountThumbnailCard
        username={account?.dpos?.delegate?.username}
        address={account?.address}
      />
    </div>
  );
};

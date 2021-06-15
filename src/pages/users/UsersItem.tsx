import React from 'react';
import { Link } from 'react-router-dom';
import { getAccountDetailsRoute } from '../../shared/router/routes';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';
import { LiskAccount } from '@lisk-react/types';

interface ContainerProps {
  account: LiskAccount;
  isLastChild: boolean;
  index: number;
}

export const UsersItem: React.FC<ContainerProps> = ({
  account,
  isLastChild,
  index
}) => {
  const uri = getAccountDetailsRoute(account.address);
  const clazz = isLastChild ? '' : 'br-b';
  return (
    <Link
      to={uri}
      className={`bg-white bgc-grey__hover flex-c p15-25 ${clazz}`}>
      <div className="w10 fc-lb">{index + 1}</div>

      <div className="rounded-bottom flex-fs flex-column w20">
        <span className="fc-lb">{account?.dpos?.delegate?.username}</span>
      </div>

      <div className="rounded-bottom flex-c w40">
        <div className="mr25">
          <LiskAvatar address={account.address} size={30} />
        </div>
        <div className="fc-lb fc-blue__hover">{account.address}</div>
      </div>
    </Link>
  );
};

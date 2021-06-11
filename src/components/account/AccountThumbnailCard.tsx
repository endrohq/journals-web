import React from 'react';
import { LiskAvatar } from '../lisk-avatar/LiskAvatar';
import { getShortenedAddress } from '../../utils/account.utils';

export const AccountThumbnailCard: React.FC<{
  username?: string;
  address: string;
}> = ({ username, address }) => (
  <div className="bg-white p15-25 flex-c w50 rounded-1">
    <LiskAvatar address={address} size={25} />
    <div className="ml15">{username || getShortenedAddress(address)}</div>
  </div>
);

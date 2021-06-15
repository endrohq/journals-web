import React from 'react';
import { AccountThumbnailCard } from '../../account/AccountThumbnailCard';
import { ArrowRightOutlined } from '@ant-design/icons';

export const FromToCards: React.FC<{ from: string; to?: string }> = ({
  from,
  to
}) => (
  <div className="flex-c mb15 bg-gray-200 p15-25">
    <AccountThumbnailCard address={from} />
    <div className="ml15 mr15">
      <ArrowRightOutlined />
    </div>
    <AccountThumbnailCard address={to} />
  </div>
);

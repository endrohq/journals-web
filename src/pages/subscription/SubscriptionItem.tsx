import React from 'react';
import { Subscription } from '../../typings';
import { getShortenedFormat } from '../../utils/string.utils';

interface Props {
  subscription: Subscription;
  blockHeight: number;
}

export const SubscriptionItem: React.FC<Props> = ({
  subscription,
  blockHeight
}) => {
  const estimatedStartDateDifference =
    (blockHeight - subscription.startsAt) * 10000;
  const startDate = new Date(
    new Date().getTime() - estimatedStartDateDifference
  );
  const estimatedExpireDateDifference =
    (blockHeight - subscription.expiresAt) * 10000;
  const expireDate = new Date(
    new Date().getTime() - estimatedExpireDateDifference
  );
  return (
    <div className="w100 p15-25 bg-white border-left border-right border-bottom flex-c">
      <div className="w20 fw-700">{getShortenedFormat(subscription.id)}</div>
      <div className="w20">
        <span className="fw-700">{subscription.startsAt}</span>{' '}
        <span className="fc-gray-500">(+- {startDate.toLocaleString()})</span>
      </div>
      <div className="w20">
        <span className="fw-700">{subscription.expiresAt}</span>{' '}
        <span className="fc-gray-500">(+- {expireDate.toLocaleString()})</span>
      </div>
    </div>
  );
};

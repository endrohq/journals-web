import React, { useMemo, useState } from 'react';
import { LiskAccount } from '@lisk-react/types';
import { LiskAvatar } from '../../components/lisk-avatar/LiskAvatar';

import { CopyOutlined } from '@ant-design/icons';
import { getShortenedFormat } from '../../utils/string.utils';
import { message, Tooltip } from 'antd';

interface ContainerProps {
  account: LiskAccount;
}

export const AccountHeaderIdentity: React.FC<ContainerProps> = ({
  account
}) => {
  const [showFullAddress, setShowFullAddress] = useState<boolean>(false);
  const isDelegate: boolean = !!account?.dpos?.delegate?.username;

  const shortenedAddress = useMemo(() => {
    return getShortenedFormat(
      account?.address,
      showFullAddress ? account?.address?.length : 15
    );
  }, [showFullAddress]);

  function copyToClipboard() {
    navigator.clipboard.writeText(account?.address);
    message.success('copied to clipboard.');
  }

  return (
    <>
      <div className="w100 flex-fs bg-black-500 p15-25 pb25 rounded-top flex-column">
        <div className="mb10">
          <h4 className="fs-n fc-white">Wallet Address</h4>
        </div>
        <div className="flex-c bg-black-500 rounded-1 w100">
          <div>
            <div className="p0 m0 lh-none mr15">
              <LiskAvatar address={account?.address} size={50} />
            </div>
          </div>
          <div>
            <div className="fs-m fw-700 w100 fc-white p0 m0">
              {!isDelegate ? (
                <span
                  className="click"
                  onClick={() => setShowFullAddress(!showFullAddress)}>
                  {shortenedAddress}
                </span>
              ) : (
                account?.dpos?.delegate?.username
              )}
            </div>
            {isDelegate && (
              <div
                onClick={() => setShowFullAddress(!showFullAddress)}
                className="fc-gray-100 click fs-s p0 m0">
                {shortenedAddress}
              </div>
            )}
          </div>
          <Tooltip title="Copy address to clipboard">
            <div
              onClick={() => copyToClipboard()}
              className="ml-auto fc-gray-100 click ">
              <CopyOutlined className="fs-xm" />
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

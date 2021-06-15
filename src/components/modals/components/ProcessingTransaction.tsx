import React, { useEffect, useState } from 'react';
import { useLiskClient } from '@lisk-react/use-lisk';
import { getShortenedFormat } from '../../../utils/string.utils';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface Props {
  transactionId: string;
  close(): void;
  action?(): void;
}

export const ProcessingTransaction: React.FC<Props> = ({
  transactionId,
  close,
  action
}) => {
  const { block } = useLiskClient();
  const [txFound, setTxFound] = useState<boolean>(false);

  useEffect(() => {
    const found = block.payload.find((tx: any) => tx.id === transactionId);
    if (found) {
      setTxFound(true);
      if (action) {
        action();
      }
    }
  }, [block]);

  if (txFound) {
    return (
      <div className="pt25 pb25">
        <div className="pl25 pr25 flex-c flex-column">
          <div className="fs-xl">
            <CheckCircleOutlined />
          </div>
          <div className="mt15 w60 txt-ac">
            Congrats! We have noticed transaction{' '}
            <b>{getShortenedFormat(transactionId)}</b> in a recent block.
          </div>
          <div className="flex-fe flex-column mt25">
            <Button
              onClick={() => close()}
              type="primary"
              className="h45--fixed w175--fixed">
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt25 pb25">
      <div className="pt25 pl25 pr25 flex-c flex-column">
        <LoadingOutlined />
        <div className="mt15 txt-ac">
          Waiting for <b>{getShortenedFormat(transactionId)}</b> to be processed
          in a upcoming block
        </div>
      </div>
    </div>
  );
};

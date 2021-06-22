import React, { useEffect, useMemo, useState } from 'react';
import { ModalProps, TxConfirmationProps } from './index';
import { useBlock, useClient } from '@lisk-react/use-lisk';
import { NavigationFooter } from '../navigation/NavigationFooter';
import { normalize } from '../../utils/object.utils';
import { fromRawLsk } from '../../utils/currency-converters';
import { ENV } from '../../env';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { getShortenedFormat } from '../../utils/string.utils';
import { Button } from 'antd';

export const TxConfirmAndProcessModal: React.FC<
  ModalProps<TxConfirmationProps>
> = ({ close, onSubmit, data: { transaction, transactionCost } }) => {
  const [isHandlingTxSubmit, setHandlingTxSubmit] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState<string>();

  const readableTx = useMemo<Record<string, any>>(() => {
    return normalize(transaction);
  }, [transaction]);

  const { client } = useClient();
  const { block } = useBlock();
  const [confirmedTransaction, setConfirmedTransaction] =
    useState<Record<string, any>>();

  useEffect(() => {
    if (!transactionId) {
      return;
    }
    const found = block.payload.find((tx: any) => tx.id === transactionId);
    if (found) {
      if (onSubmit) {
        onSubmit(found);
        close();
      } else {
        setConfirmedTransaction(found);
      }
    }
  }, [block]);

  async function handleSubmit() {
    try {
      const { transactionId } = await client.transaction.send(transaction);
      setTransactionId(transactionId);
    } catch (error) {
      console.log(error);
    } finally {
      setHandlingTxSubmit(false);
    }
  }

  function getConfirmTx() {
    const readableTransactionCost = Number(fromRawLsk(transactionCost));
    const readableFee = Number(fromRawLsk(readableTx.fee));
    const readableTotal = readableTransactionCost + readableFee;
    return (
      <>
        <div className="p15 bg-gray-100 rounded-1 mb15">
          <div className="mb10 pb10 border-bottom">
            <div className="flex-c flex-jc-sb">
              <span className="fw-700">Transaction Costs</span>
              <span>
                {readableTransactionCost} {ENV.TICKER}
              </span>
            </div>
            <div className="flex-c flex-jc-sb">
              <span className="fw-700">Fee</span>
              <span>
                {readableFee} {ENV.TICKER}
              </span>
            </div>
          </div>
          <div className="flex-c flex-jc-sb">
            <span className="fw-700">Total</span>
            <span className="fw-700 fc-primary">
              {readableTotal} {ENV.TICKER}
            </span>
          </div>
        </div>
        <NavigationFooter
          disabled={isHandlingTxSubmit}
          action={handleSubmit}
          close={close}
          confirmLabel="Submit"
        />
      </>
    );
  }

  function getProcessingTx() {
    return (
      <div className="pt25 pl25 pr25 mb25 flex-c flex-column">
        <LoadingOutlined />
        <div className="mt15 txt-ac">
          Waiting for <b>{getShortenedFormat(transactionId)}</b> to be processed
          in a upcoming block
        </div>
      </div>
    );
  }

  function getConfirmedTx() {
    return (
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
    );
  }

  return (
    <div className="pt50 pb25">
      <div className=" pl25 pr25">
        <h2 className="fw-700 fs-xm p0 m0">Confirm transaction</h2>
        <p>Make sure that all values are correct before submitting</p>
      </div>
      <div className="pl25 pr25">
        {!transactionId
          ? getConfirmTx()
          : !confirmedTransaction
          ? getProcessingTx()
          : getConfirmedTx()}
      </div>
    </div>
  );
};

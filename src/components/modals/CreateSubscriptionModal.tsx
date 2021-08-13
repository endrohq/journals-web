import React, { useState } from 'react';

import {
  CreateSubscriptionProps,
  ModalProps,
  ModalType,
  TxConfirmationProps
} from './';
import { transactions } from '@liskhq/lisk-client';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { useModal } from '../../hooks/useModal';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { Button } from 'antd';
import { fromRawLsk } from '../../utils/currency-converters';
import { ENV } from '../../env';

const periods = [
  {
    period: '1 Month',
    value: 1
  },
  {
    period: '3 Months',
    value: 3
  },
  {
    period: '1 Year',
    value: 12
  }
];

export const CreateSubscriptionModal: React.FC<
  ModalProps<CreateSubscriptionProps>
> = ({ close, data: { refresh } }) => {
  const { openModal } = useModal();
  const { account } = useWallet();
  const { client } = useClient();
  const [amount, setAmount] = useState<number>(1);

  async function createSubscription() {
    const transaction = await client.transaction.create(
      {
        moduleID: 1025,
        assetID: 0,
        nonce: BigInt(account.sequence.nonce),
        senderPublicKey: Buffer.from(account.keys.publicKey, 'hex'),
        fee: BigInt(transactions.convertLSKToBeddows('0.1')),
        asset: {
          amount: Number(amount)
        }
      },
      account.passphrase
    );
    openModal<TxConfirmationProps>(ModalType.TRANSACTION_CONFIRM, {
      data: {
        transaction,
        transactionCost: TRANSACTION_COSTS.CREATE_SUBSCRIPTION * amount
      },
      onSubmit() {
        refresh();
      }
    });
  }

  const subscriptionFee = fromRawLsk(TRANSACTION_COSTS.CREATE_SUBSCRIPTION);

  return (
    <div className="">
      <div className="p15-25">
        <div className="mt25 mb25">
          <h2 className="fw-700 fs-xm p0 m0">Setup subscriptions</h2>
          <p>Activate your account with 1 or more subscriptions</p>
        </div>
        <div className="grid-col3 mb25 ">
          {periods.map(item => (
            <div
              onClick={() => setAmount(item.value)}
              className={`p15-25 w100 click flex-c flex-jc-c rounded-1 border ${
                item.value === amount && 'bg-black-800 fc-white'
              }`}>
              <div>{item.period}</div>
            </div>
          ))}
        </div>
        <div className="w70">
          A subscription for 1 month costs {subscriptionFee} {ENV.TICKER}.
          You're total amount will be{' '}
          <span className="fw-700">
            {amount ? `${Number(subscriptionFee) * amount}` : '0'} {ENV.TICKER}
          </span>
        </div>
      </div>

      <div className="border-top pt10 pb10 pl15 pr15 flex-c flex-jc-fe">
        <Button
          disabled={amount <= 0}
          onClick={createSubscription}
          className=""
          type="primary">
          Pay
        </Button>
      </div>
    </div>
  );
};

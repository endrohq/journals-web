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
import { FormInput } from '../input/FormInput';
import { fromRawLsk } from '../../utils/currency-converters';
import { ENV } from '../../env';

export const CreateSubscriptionModal: React.FC<
  ModalProps<CreateSubscriptionProps>
> = ({ close, data: { refresh } }) => {
  const { openModal } = useModal();
  const { account } = useWallet();
  const { client } = useClient();
  const [amount, setAmount] = useState<number>(0);

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
    <div className="p15-25 ">
      <div className="mt25">
        <h2 className="fw-700 fs-xm p0 m0">Setup subscriptions</h2>
        <p>Activate your account with 1 or more subscriptions</p>
      </div>
      <div className=" mb25">
        <FormInput
          label="Amount"
          property="amount"
          placeholder="0"
          value={amount}
          setValue={setAmount}
          input_type="number"
        />
      </div>
      <div className="w70">
        A subscription for 1 round costs {subscriptionFee} {ENV.TICKER}. You're
        total amount will be{' '}
        <span className="fw-700">
          {amount ? `${Number(subscriptionFee) * amount}` : '0'} {ENV.TICKER}
        </span>
      </div>
      <div className="mt10 fw-700">
        1 subscription = participating in 1 treasury round
      </div>
      <div className="border-top mt25 pt25  flex-c flex-jc-fe">
        <Button
          disabled={amount <= 0}
          onClick={createSubscription}
          className="h45--fixed w175--fixed"
          type="primary">
          Create
        </Button>
      </div>
    </div>
  );
};

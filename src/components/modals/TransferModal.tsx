import React, { useEffect } from 'react';
import { transactions } from '@liskhq/lisk-client';
import {
  ModalProps,
  ModalType,
  TransferProps,
  TxConfirmationProps
} from './index';
import { ENV } from '../../env';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { useModal } from '../../hooks/useModal';
import { AccountThumbnailCard } from '../account/AccountThumbnailCard';
import { ArrowRightOutlined } from '@ant-design/icons';
import { FormInput } from '../input/FormInput';
import { NavigationFooter } from '../navigation/NavigationFooter';

export interface TransferAssetForm {
  amount: number;
  recipientAddress: string;
}

export const TransferModal: React.FC<ModalProps<TransferProps>> = ({
  close,
  data
}) => {
  const { openModal } = useModal();
  const { account } = useWallet();
  const { client } = useClient();
  const [amount, setAmount] = React.useState<number>();
  const [recipientAddress, setRecipient] = React.useState<string>();

  useEffect(() => {
    if (fromOwnWallet) {
      setRecipient(data?.to);
    }
  }, []);

  const fromOwnWallet = account?.address !== data?.to;

  async function handleSubmit({ amount, recipientAddress }: TransferAssetForm) {
    const amountInBeddows = BigInt(
      transactions.convertLSKToBeddows(amount.toString())
    );
    const transaction = await client.transaction.create(
      {
        moduleID: 2,
        assetID: 0,
        nonce: BigInt(account.sequence.nonce),
        senderPublicKey: Buffer.from(account.keys.publicKey, 'hex'),
        fee: BigInt(transactions.convertLSKToBeddows('0.1')),
        asset: {
          amount: amountInBeddows,
          recipientAddress: Buffer.from(recipientAddress, 'hex'),
          data: ''
        }
      },
      account.passphrase
    );
    openModal<TxConfirmationProps>(ModalType.TRANSACTION_CONFIRM, {
      data: {
        transaction,
        transactionCost: Number(amountInBeddows)
      }
    });
  }

  return (
    <div className="pb25">
      <div className="pt25 pl25 pr25 ">
        <h2 className="fw-700 fs-xm p0 m0">Transfer</h2>
        <p>Send {ENV.TICKER} from 1 account to another</p>
      </div>
      <div className="flex-c mb15 bg-gray-200 p15-25">
        <AccountThumbnailCard address={account?.address} />
        <div className="ml15 mr15">
          <ArrowRightOutlined />
        </div>
        <AccountThumbnailCard address={recipientAddress} />
      </div>
      <div className="pl25 pr25">
        <div className=" mb25">
          <FormInput
            label="Recipient *"
            property="recipient"
            placeholder="Insert public address"
            value={recipientAddress}
            disabled={fromOwnWallet}
            setValue={setRecipient}
          />
        </div>
        <div className="mb25">
          <FormInput
            label="Amount *"
            property="amount"
            input_type="number"
            value={amount}
            setValue={setAmount}
          />
        </div>
        <div className=" mb25">
          <FormInput
            label="Optional message"
            property="recipient"
            placeholder="Insert public address"
            value={amount}
            setValue={setAmount}
          />
        </div>
        <NavigationFooter
          disabled={!amount || amount <= 0}
          action={() => handleSubmit({ amount, recipientAddress })}
          close={close}
          confirmLabel="Transfer"
        />
      </div>
    </div>
  );
};

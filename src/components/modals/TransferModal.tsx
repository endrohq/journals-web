import React, { useEffect } from 'react';
import { transactions } from '@liskhq/lisk-client';
import { ModalProps, TransferProps } from '.';
import { FormInput } from 'src/components/input/FormInput';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { ENV } from '../../env';
import { useLiskClient, useLiskWallet } from '@lisk-react/use-lisk';
import { AccountThumbnailCard } from '../account/AccountThumbnailCard';

export const TransferModal: React.FC<ModalProps<TransferProps>> = ({
  close,
  onSubmit,
  data
}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [amount, setAmount] = React.useState<number>();
  const [recipientAddress, setRecipient] = React.useState<string>();
  const { account } = useLiskWallet();
  const { client } = useLiskClient();
  const fromOwnWallet = account?.address !== data?.to;

  async function handleSubmit() {
    setSubmitting(true);
    const tx = await client.transaction.create(
      {
        moduleID: 2,
        assetID: 0,
        nonce: BigInt(account.sequence.nonce),
        senderPublicKey: Buffer.from(account.keys.publicKey, 'hex'),
        fee: BigInt(transactions.convertLSKToBeddows('0.1')),
        asset: {
          amount: BigInt(transactions.convertLSKToBeddows(amount.toString())),
          recipientAddress: Buffer.from(recipientAddress, 'hex'),
          data: ''
        }
      },
      account.passphrase
    );

    try {
      await client.transaction.send(tx);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (fromOwnWallet) {
      setRecipient(data?.to);
    }
  }, []);

  return (
    <div className="">
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
      </div>

      <div className="pl25 pr25 border-top pt15 pb15 flex-c flex-jc-fe">
        <div onClick={close} className="mr25 fc-grey click">
          <span>Cancel</span>
        </div>
        <Button
          className=""
          type="primary"
          disabled={submitting || !amount || amount <= 0}
          onClick={handleSubmit}>
          Transfer
        </Button>
      </div>
    </div>
  );
};

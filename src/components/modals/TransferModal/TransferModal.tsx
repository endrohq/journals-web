import React from 'react';
import { transactions } from '@liskhq/lisk-client';
import { ModalProps, TransferProps } from '../index';
import { ENV } from '../../../env';
import { useLiskClient, useLiskWallet } from '@lisk-react/use-lisk';
import { TransferModalForm } from './TransferModalForm';
import { ProcessingTransaction } from '../components/ProcessingTransaction';

export interface TransferAssetForm {
  amount: number;
  recipientAddress: string;
}

export const TransferModal: React.FC<ModalProps<TransferProps>> = ({
  close,
  data
}) => {
  const [isHandlingTxSubmit, setHandlingTxSubmit] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState<string>();
  const { account } = useLiskWallet();
  const { client } = useLiskClient();
  const fromOwnWallet = account?.address !== data?.to;

  async function handleSubmit({ amount, recipientAddress }: TransferAssetForm) {
    setHandlingTxSubmit(true);
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
      const { transactionId } = await client.transaction.send(tx);
      setTransactionId(transactionId);
    } catch (error) {
      console.log(error);
    } finally {
      setHandlingTxSubmit(false);
    }
  }

  return (
    <div className="">
      <div className="pt25 pl25 pr25 ">
        <h2 className="fw-700 fs-xm p0 m0">Transfer</h2>
        <p>Send {ENV.TICKER} from 1 account to another</p>
      </div>
      {!transactionId ? (
        <TransferModalForm
          account={account}
          close={close}
          fromOwnWallet={fromOwnWallet}
          submit={handleSubmit}
          to={data?.to}
          isHandlingTxSubmit={isHandlingTxSubmit}
        />
      ) : (
        <ProcessingTransaction transactionId={transactionId} close={close} />
      )}
    </div>
  );
};

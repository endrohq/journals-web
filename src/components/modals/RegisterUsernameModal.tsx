import React from 'react';
import { ModalProps } from './index';
import { useLiskClient, useLiskWallet } from '@lisk-react/use-lisk';
import { ProcessingTransaction } from './components/ProcessingTransaction';
import { FormInput } from '../input/FormInput';
import { Button } from 'antd';

export const RegisterUsernameModal: React.FC<ModalProps> = ({
  close,
  onSubmit
}) => {
  const [isHandlingTxSubmit, setHandlingTxSubmit] = React.useState(false);
  const [username, setUsername] = React.useState<string>();
  const [transactionId, setTransactionId] = React.useState<string>();
  const { account } = useLiskWallet();
  const { client } = useLiskClient();

  async function handleSubmit() {
    setHandlingTxSubmit(true);
    const tx = await client.transaction.create(
      {
        moduleID: 5,
        assetID: 0,
        nonce: BigInt(account.sequence.nonce),
        senderPublicKey: Buffer.from(account.keys.publicKey, 'hex'),
        fee: BigInt(1100000000),
        asset: {
          username
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
    <>
      <div className="pt25 pl25 pr25 ">
        <h2 className="fw-700 fs-xm p0 m0">Register username</h2>
        <p>Get recognized by the community</p>
      </div>
      {!transactionId ? (
        <div className="pt25 pl25 pr25">
          <div className=" mb25">
            <FormInput
              label="Username"
              property="username"
              placeholder="hello_world"
              value={username}
              setValue={setUsername}
            />
          </div>
          <div className="border-top pt15 pb15 flex-c flex-jc-fe">
            <div onClick={close} className="mr25 fc-gray-200 click">
              <span>Cancel</span>
            </div>
            <Button
              className=""
              type="primary"
              disabled={isHandlingTxSubmit || !username || username?.length < 3}
              onClick={() => handleSubmit()}>
              Register
            </Button>
          </div>
        </div>
      ) : (
        <ProcessingTransaction
          transactionId={transactionId}
          close={close}
          action={onSubmit}
        />
      )}
    </>
  );
};

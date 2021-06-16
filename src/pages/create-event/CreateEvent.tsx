import React, { useState } from 'react';
import { FormInput } from '../../components/input/FormInput';
import { Button } from 'antd';
import { useLiskClient, useLiskWallet } from '@lisk-react/use-lisk';
import { ProcessingTransaction } from '../../components/modals/components/ProcessingTransaction';
import { generateUUID } from '../../utils/uuid.utils';

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [isHandlingTxSubmit, setHandlingTxSubmit] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState<string>();
  const { account } = useLiskWallet();
  const { client } = useLiskClient();

  async function handleSubmit() {
    setHandlingTxSubmit(true);
    const tx = await client.transaction.create(
      {
        moduleID: 1024,
        assetID: 0,
        nonce: BigInt(account.sequence.nonce),
        senderPublicKey: Buffer.from(account.keys.publicKey, 'hex'),
        fee: BigInt(1100000000),
        asset: {
          id: generateUUID(),
          title,
          description,
          createdBy: account.address
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
    <div className="grid-xl mt50 mb200">
      <div className="w50 m-auto">
        <div className="mb50">
          <h1 className="fw-700 p0 m0">Create a new event</h1>
          <p>Build a new event with linked articles</p>
        </div>
        {transactionId ? (
          <ProcessingTransaction
            transactionId={transactionId}
            close={() => ''}
          />
        ) : (
          <>
            <div className=" mb25">
              <FormInput
                label="Title"
                property="title"
                placeholder="Title"
                value={title}
                setValue={setTitle}
              />
            </div>
            <div className=" mb25">
              <FormInput
                label="Description"
                property="description"
                placeholder="What happened?"
                input_type="textarea"
                value={description}
                setValue={setDescription}
                rows={5}
              />
            </div>
            <div className="border-top pt15 pb15 flex-c flex-jc-fe">
              <Button
                disabled={isHandlingTxSubmit}
                onClick={handleSubmit}
                className="h45--fixed w175--fixed"
                type="primary">
                Create
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;

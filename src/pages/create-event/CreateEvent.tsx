import React, { useState } from 'react';
import { FormInput } from '../../components/input/FormInput';
import { Button } from 'antd';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { ModalType, TxConfirmationProps } from '../../components/modals';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { useModal } from '../../hooks/useModal';
import { useHistory } from 'react-router-dom';
import { getEventDetailsRoute, ROUTES } from '../../shared/router/routes';

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const { account } = useWallet();
  const { client } = useClient();
  const history = useHistory();
  const { openModal } = useModal();

  async function handleSubmit() {
    try {
      const transaction = await client.transaction.create(
        {
          moduleID: 1024,
          assetID: 0,
          nonce: BigInt(account.sequence.nonce),
          senderPublicKey: Buffer.from(account.keys.publicKey, 'hex'),
          fee: BigInt(1100000000),
          asset: {
            title,
            description,
            createdBy: Buffer.from(account.address, 'hex')
          }
        },
        account.passphrase
      );
      openModal<TxConfirmationProps>(ModalType.TRANSACTION_CONFIRM, {
        data: {
          transaction,
          transactionCost: TRANSACTION_COSTS.CREATE_SUBSCRIPTION
        },
        onSubmit(tx) {
          console.log(tx);
          let route = tx?.id ? getEventDetailsRoute(tx.id) : ROUTES.HOME;
          history.push(route);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="grid-xl mt50 mb200">
      <div className="w50 m-auto">
        <div className="mb50">
          <h1 className="fw-700 p0 m0">Create a new event</h1>
          <p>Build a new event with linked articles</p>
        </div>
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
            onClick={handleSubmit}
            className="h45--fixed w175--fixed"
            type="primary">
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;

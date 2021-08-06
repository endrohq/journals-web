import React, { useState } from 'react';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { ModalType, TxConfirmationProps } from '../../components/modals';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { useModal } from '../../hooks/useModal';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../shared/router/routes';
import { getCurrentUnixDate } from '../../utils/date.utils';
import { CreateEventUpload } from './CreateEventUpload';
import { CreateEventContext } from './CreateEventContext';
import { UploadContext } from '../../typings';

const CreateEvent: React.FC = () => {
  const [uploadContext, setUploadContext] = useState<UploadContext>();

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
            dateCreated: getCurrentUnixDate()
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
          history.push(ROUTES.HOME);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="create-event grid-xl mt50">
      {!uploadContext ? (
        <CreateEventUpload setUploadContext={setUploadContext} />
      ) : (
        <CreateEventContext
          uploadContext={uploadContext}
          create={handleSubmit}
        />
      )}
    </div>
  );
};

export default CreateEvent;

import React, { useState } from 'react';
import { FormInput } from '../../components/input/FormInput';
import { Button } from 'antd';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { ModalType, TxConfirmationProps } from '../../components/modals';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { useModal } from '../../hooks/useModal';
import { useHistory } from 'react-router-dom';
import { getEventDetailsRoute, ROUTES } from '../../shared/router/routes';
import { CreateEventLocation } from './CreateEventLocation';
import { OpenStreetLocation, UploadContext } from '../../typings';
import { CreateEventVideoPreview } from './CreateEventVideoPreview';
import { FileUpload } from '../../components/input/FileUpload';

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [uploadContext, setUploadContext] = useState<UploadContext>();
  const [location, setLocation] = useState<OpenStreetLocation>();
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
            latitude: location.y?.toString(),
            longitude: location.x.toString(),
            createdBy: Buffer.from(account.address, 'hex'),
            videoId: uploadContext.videoId,
            labels: uploadContext.labels
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
    <div className="create-event grid-xl mt50 mb200 ">
      <div className="mb50">
        <h1 className="fw-700 fs-xl p0 m0">Start News Event</h1>
        <p>What happened? Fill in as much as you can!</p>
      </div>
      <div className="w100 flex-fs flex-jc-sb">
        <div className="w60">
          <FileUpload
            setUploadContext={context => setUploadContext(context)}
            uploadContext={uploadContext}
            removeUploadContext={() => setUploadContext(undefined)}
          />
          <div className=" mb25">
            <FormInput
              label="Title"
              property="title"
              placeholder="Title"
              value={title}
              setValue={setTitle}
            />
          </div>

          <CreateEventLocation
            location={location}
            setLocation={location => setLocation(location)}
          />
          <div className="border-top pt15 pb15 flex-c flex-jc-fe">
            <Button
              disabled={!title || !location}
              onClick={handleSubmit}
              className="h45--fixed w175--fixed"
              type="primary">
              Create
            </Button>
          </div>
        </div>
        <div className="w35">
          <CreateEventVideoPreview uploadContext={uploadContext} />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;

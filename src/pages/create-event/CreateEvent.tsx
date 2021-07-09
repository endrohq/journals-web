import React, { useState } from 'react';
import { FormInput } from '../../components/input/FormInput';
import { Button } from 'antd';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { ModalType, TxConfirmationProps } from '../../components/modals';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { useModal } from '../../hooks/useModal';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../shared/router/routes';
import { CreateEventLocation } from './CreateEventLocation';
import { OpenStreetLocation, UploadContext, Entity } from '../../typings';
import { CreateEventDataPreview } from './CreateEventDataPreview';
import { FileUpload } from '../../components/input/FileUpload';
import { getCurrentUnixDate } from '../../utils/date.utils';
import { ENV } from '../../env';

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadContext, setUploadContext] = useState<UploadContext>();
  const [annotations, setAnnotations] =
    useState<{ entities: Entity[]; verbs: string[] }>();
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
            location: {
              latitude: location.y?.toString(),
              longitude: location.x.toString()
            },
            media: [
              {
                mediaId: uploadContext.mediaId,
                labels: uploadContext.labels
              }
            ],
            statement: {
              text: description,
              entities: annotations.entities,
              verbs: annotations.verbs
            },
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

  async function processDescription() {
    try {
      setIsProcessing(true);
      const response = await fetch(`${ENV.PREDICTION_API}/annotate`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
      });
      if (response.ok) {
        const content = await response.json();
        setAnnotations(content);
      }
    } catch (e) {
    } finally {
      setIsProcessing(false);
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
          <div className="mb25">
            <FileUpload
              setUploadContext={context => setUploadContext(context)}
              uploadContext={uploadContext}
              removeUploadContext={() => setUploadContext(undefined)}
            />
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
              label="What happened?"
              disabled={isProcessing}
              property="description"
              placeholder="I just saw .."
              value={description}
              setValue={setDescription}
              onBlur={processDescription}
              input_type="textarea"
              rows={5}
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
          <CreateEventDataPreview
            uploadContext={uploadContext}
            entities={annotations?.entities}
            verbs={annotations?.verbs}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;

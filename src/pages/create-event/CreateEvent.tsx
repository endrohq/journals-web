import React, { useState } from 'react';
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
import { BookOutlined } from '@ant-design/icons';
import { RichTextField } from '../../components/input/RichTextField';
import { Descendant } from 'slate';

const CreateEvent: React.FC = () => {
  const [description, setDescription] = React.useState<Descendant[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);
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
              text: isProcessing,
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
      processDescription();
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
        body: JSON.stringify({ description: '' })
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
    <div className="create-event grid-xl mt50">
      <div className="w100 flex-fs flex-jc-sb">
        <div className="w60">
          <div className="flex-c lh-none pb25 border-bottom mb25">
            <div className="mr25">
              <BookOutlined className="fs-xxl" />
            </div>
            <div className=" ">
              <h1 className="fw-700 fs-l p0 m0">Publish News</h1>
            </div>
          </div>
          <div className="mb25">
            <FileUpload
              setUploadContext={context => setUploadContext(context)}
              uploadContext={uploadContext}
              files={files}
              setFile={(file: File) => setFiles([file])}
            />
          </div>
          <div className=" mb25">
            <RichTextField
              label="Description"
              value={description}
              setValue={setDescription}
              placeholder="Provide some context"
              error={undefined}
            />
          </div>

          <CreateEventLocation
            location={location}
            setLocation={location => setLocation(location)}
          />
          <div className="border-top pt15 pb15 flex-c flex-jc-fe">
            <Button
              disabled={!location}
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

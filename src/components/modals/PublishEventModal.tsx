import React, { useState } from 'react';

import {
  PublishEventProps,
  ModalProps,
  ModalType,
  TxConfirmationProps
} from './';
import { Entity, NewsEventMedia, OpenStreetLocation } from '../../typings';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { useModal } from '../../hooks/useModal';
import { Button } from 'antd';
import { getCurrentUnixDate } from '../../utils/date.utils';
import { CreateEventLocation } from '../../pages/create-event/CreateEventLocation';
import { FormInput } from '../input/FormInput';
import { ENV } from '../../env';

export const PublishEventModal: React.FC<ModalProps<PublishEventProps>> = ({
  data: { eventId, refresh }
}) => {
  const [uploadContext, setUploadContext] = useState<NewsEventMedia>();
  const [location, setLocation] = useState<OpenStreetLocation>();
  const [description, setDescription] = useState<string>();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [annotations, setAnnotations] =
    useState<{ entities: Entity[]; verbs: string[] }>();

  const { client } = useClient();
  const { account } = useWallet();
  const { openModal } = useModal();
  async function handleSubmit() {
    try {
      const transaction = await client.transaction.create(
        {
          moduleID: 1024,
          assetID: 1,
          nonce: BigInt(account.sequence.nonce),
          senderPublicKey: Buffer.from(account.keys.publicKey, 'hex'),
          fee: BigInt(1100000000),
          asset: {
            eventId,
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
        onSubmit() {
          refresh();
        }
      });
    } catch (e) {
      setUploadContext(undefined);
      console.error(e);
    }
  }

  async function processDescription() {
    try {
      setIsProcessing(true);
      const response = await fetch(`${ENV.ANALISIS_API}/annotate`, {
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
    <div className="pb25 w100-imp">
      <div className="pt25 pl25 pr25 mb25">
        <h2 className="fw-700 fs-xm p0 m0">Contribute</h2>
        <p>Uploading a new video</p>
      </div>
      <div className="w100 mb15 pl25 pr25 create-event">
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
        <div className="border-top mt25 pt25  flex-c flex-jc-fe">
          <Button
            disabled={!uploadContext}
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

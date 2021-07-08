import React, { useState } from 'react';

import {
  ContributeToEventProps,
  ModalProps,
  ModalType,
  TxConfirmationProps
} from './';
import { FileUpload } from '../input/FileUpload';
import { NewsEventMedia, OpenStreetLocation } from '../../typings';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { useModal } from '../../hooks/useModal';
import { Button } from 'antd';
import { getCurrentUnixDate } from '../../utils/date.utils';
import { CreateEventLocation } from '../../pages/create-event/CreateEventLocation';

export const PublishToEventModal: React.FC<ModalProps<ContributeToEventProps>> =
  ({ data: { eventId, refresh } }) => {
    const [uploadContext, setUploadContext] = useState<NewsEventMedia>();
    const [location, setLocation] = useState<OpenStreetLocation>();
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
        console.error(e);
      }
    }

    return (
      <div className="pb25 w100-imp">
        <div className="pt25 pl25 pr25 mb25">
          <h2 className="fw-700 fs-xm p0 m0">Contribute</h2>
          <p>Uploading a new video</p>
        </div>
        <div className="w100 mb15 pl25 pr25 create-event">
          <div className="mb15">
            <FileUpload
              uploadContext={uploadContext}
              setUploadContext={context => setUploadContext(context)}
              removeUploadContext={() => setUploadContext(undefined)}
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

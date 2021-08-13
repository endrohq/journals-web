import React, { useEffect, useState } from 'react';

import {
  CreateEventProps,
  ModalProps,
  ModalType,
  TxConfirmationProps
} from '../index';
import { ContentItem, FileContext, TextAnnotations } from '../../../typings';
import { Button } from 'antd';
import { useApi } from '../../../services/use-api';
import { CreateEventHeader } from './CreateEventHeader';
import { CreateEventPreview } from './CreateEventPreview';
import { CreateEventStatus } from './CreateEventStatus';
import { getCurrentUnixDate } from '../../../utils/date.utils';
import { TRANSACTION_COSTS } from '../../../utils/transaction.utils';
import { ROUTES } from '../../../shared/router/routes';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal';
import { isObjectWithFields } from '../../../utils/type.utils';
import { FormInput } from '../../input/FormInput';
import { CreateEventThumbnails } from './CreateEventThumbnails';
import { isVideo } from '../../../utils/file.utils';

export const CreateEvent: React.FC<ModalProps<CreateEventProps>> = ({
  data: { eventId }
}) => {
  const { api } = useApi();
  const { account } = useWallet();
  const { client } = useClient();
  const history = useHistory();
  const { openModal } = useModal();

  // IPFS Content Item
  const [loading, setLoading] = useState<boolean>(true);
  const [contentItem, setContentItem] = useState<ContentItem>();

  // Metadata on IPFS content
  const [metadataLoading, setMetadataLoading] = useState<boolean>(false);
  const [fileContext, setFileContext] = useState<FileContext>();

  // Description + NER
  const [updatingAnnotations, shouldUpdateAnnotations] =
    useState<boolean>(false);
  const [textAnnotations, setTextAnnotations] = useState<TextAnnotations>();
  const [description, setDescription] = React.useState<string>('');

  // Thumbnail CID
  const [thumbnailCid, setThumbnailCid] = useState<string>();

  useEffect(() => {
    fetchEventConcept();
  }, []);

  useEffect(() => {
    if (updatingAnnotations) {
      annotateText();
    }
  }, [updatingAnnotations]);

  useEffect(() => {
    if (description?.length > 3) {
      shouldUpdateAnnotations(true);
    }
  }, [description]);

  useEffect(() => {
    if (isObjectWithFields(contentItem)) {
      setMetadataLoading(true);
      createContext();
    }
  }, [contentItem]);

  useEffect(() => {
    if (isObjectWithFields(fileContext)) {
      setInitialThumbnailCid();
    }
  }, [fileContext, contentItem]);

  async function fetchEventConcept() {
    try {
      const { data } = await api.storage.getEvent(account?.address, eventId);
      setContentItem(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function setInitialThumbnailCid() {
    if (isVideo(fileContext.type)) {
      const thumbnails = contentItem?.items?.filter(
        item => !item.name?.startsWith('original')
      );
      setThumbnailCid(thumbnails?.[0]?.cid);
    }
  }

  function canSubmit() {
    return description?.length > 3;
  }

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
              latitude: fileContext?.gps?.latitude?.toString(),
              longitude: fileContext?.gps?.longitude?.toString()
            },
            media: [
              {
                thumbnailCid,
                originalCid: contentItem.items[0].cid,
                labels: fileContext.labels
              }
            ],
            statement: {
              text: description,
              entities: textAnnotations.entities,
              verbs: textAnnotations.verbs
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

  async function createContext() {
    try {
      const original = contentItem?.items[0]?.path;
      const [metadataResponse, insightsResponse] = await Promise.all([
        api.storage.getMetadata(account?.address, eventId),
        api.analisis.getContentContext(contentItem?.cid, original)
      ]);
      const context = {
        ...metadataResponse?.data,
        ...insightsResponse?.data
      };
      if (isObjectWithFields(context)) {
        setFileContext(context);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMetadataLoading(false);
    }
  }

  async function annotateText() {
    try {
      const { data } = await api.analisis.annotateText(description);
      setTextAnnotations(data);
    } catch (error) {
      console.error(error);
    } finally {
      shouldUpdateAnnotations(false);
    }
  }

  return (
    <div>
      <div className="p50">
        <div className="flex-fs flex-jc-sb">
          <div className="w60">
            <CreateEventHeader />
            <CreateEventStatus
              fileContext={fileContext}
              contentItem={contentItem}
              contentLoading={loading}
              metadataLoading={metadataLoading}
            />
            <div className="mb25">
              <CreateEventThumbnails
                fileContext={fileContext}
                thumbnailCid={thumbnailCid}
                setThumbnailCid={setThumbnailCid}
                contentItem={contentItem}
              />
            </div>
            <div className=" mb25">
              <FormInput
                label="Context"
                disabled={updatingAnnotations}
                value={description}
                setValue={setDescription}
                placeholder="Tell us what happened"
                property="description"
                input_type="textarea"
                error={undefined}
                rows={6}
              />
            </div>
          </div>
          <div className="w35">
            <CreateEventPreview
              contentItem={contentItem}
              thumbnailCid={thumbnailCid}
              loading={loading}
              textAnnotations={textAnnotations}
              fileContext={fileContext}
            />
          </div>
        </div>
      </div>
      <div className="border-top p15-25 flex-c flex-jc-fe">
        <Button
          disabled={!canSubmit()}
          onClick={handleSubmit}
          className=""
          type="primary">
          Publish
        </Button>
      </div>
    </div>
  );
};

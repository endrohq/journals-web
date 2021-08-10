import React, { useEffect, useState } from 'react';

import {
  CreateEventProps,
  ModalProps,
  ModalType,
  TxConfirmationProps
} from '../index';
import { ContentItem, FileContext, TextAnnotations } from '../../../typings';
import { Button } from 'antd';
import { Descendant } from 'slate';
import { useApi } from '../../../services/use-api';
import { CreateEventHeader } from './CreateEventHeader';
import { RichTextField } from '../../input/RichTextField';
import { CreateEventPreview } from './CreateEventPreview';
import { CreateEventStatus } from './CreateEventStatus';
import { getCurrentUnixDate } from '../../../utils/date.utils';
import { TRANSACTION_COSTS } from '../../../utils/transaction.utils';
import { ROUTES } from '../../../shared/router/routes';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal';
import { isObjectWithFields } from '../../../utils/type.utils';

export const CreateEvent: React.FC<ModalProps<CreateEventProps>> = ({
  data: { eventId }
}) => {
  const [description, setDescription] = React.useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }]
    }
  ]);

  const { api } = useApi();
  const { account } = useWallet();
  const { client } = useClient();
  const history = useHistory();
  const { openModal } = useModal();
  const [fileContext, setFileContext] = useState<FileContext>();
  const [contentItem, setContentItem] = useState<ContentItem>();
  const [textAnnotations, setTextAnnotations] = useState<TextAnnotations>();
  const [loading, setLoading] = useState<boolean>(true);
  const [metadataLoading, setMetadataLoading] = useState<boolean>(true);
  const [updatingContext, shouldUpdateContext] = useState<boolean>(false);

  useEffect(() => {
    fetchEventConcept();
  }, []);

  useEffect(() => {
    if (updatingContext) {
      annotateText();
    }
  }, [updatingContext]);

  useEffect(() => {
    shouldUpdateContext(true);
  }, [description]);

  useEffect(() => {
    if (isObjectWithFields(contentItem)) {
      createContext();
    }
  }, [contentItem]);

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

  async function createContext() {
    try {
      const { data } = await api.storage.getMetadata(account?.address, eventId);
      if (data) {
        setFileContext(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMetadataLoading(false);
    }
  }

  async function annotateText() {
    try {
      const { data } = await api.analisis.annotateText('');
      setTextAnnotations(data);
    } catch (error) {
      console.error(error);
    } finally {
      shouldUpdateContext(false);
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
              loading={loading || metadataLoading}
              ipfsPath={contentItem?.path}
            />
            <div className=" mb25">
              <RichTextField
                label="Context"
                value={description}
                setValue={setDescription}
                placeholder="Provide some context on what happened"
                error={undefined}
              />
            </div>
          </div>
          <div className="w35">
            <CreateEventPreview
              contentItem={contentItem}
              loading={loading}
              textAnnotations={textAnnotations}
              fileContext={fileContext}
            />
          </div>
        </div>
      </div>
      <div className="border-top p15-25 flex-c flex-jc-fe">
        <Button disabled onClick={handleSubmit} className="" type="primary">
          Publish
        </Button>
      </div>
    </div>
  );
};

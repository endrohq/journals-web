import React, { useEffect, useState } from 'react';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { message } from 'antd';
import { ModalType, TxConfirmationProps } from '../../components/modals';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { useModal } from '../../hooks/useModal';
import { NewsEvent } from '../../typings';
import { HeartOutlined } from '@ant-design/icons';

interface Props {
  event: NewsEvent;
  refresh(): void;
}

const EventItemHeaderSupport: React.FC<Props> = ({ event, refresh }) => {
  const { account, isAuthenticated } = useWallet();
  const { client } = useClient();
  const { openModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [isSupportingEvent, setIsSupportingEvent] = useState(false);

  async function fetchData() {
    try {
      const data = (await client.invoke('treasury:hasSupportedEvent', {
        address: account.address,
        eventId: event.id
      })) as boolean;
      setIsSupportingEvent(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  async function handleSubmit() {
    try {
      const data = (await client.invoke('treasury:hasActiveSubscription', {
        address: account?.address
      })) as boolean;
      if (!data) {
        message.error("You don't have an active subscription");
        return;
      }

      const transaction = await client.transaction.create(
        {
          moduleID: 1025,
          assetID: 1,
          nonce: BigInt(account.sequence.nonce),
          senderPublicKey: Buffer.from(account.keys.publicKey, 'hex'),
          fee: BigInt(1100000000),
          asset: {
            eventId: event.id,
            address: Buffer.from(account.address, 'hex')
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
    } catch (e) {}
  }

  if (loading) return <></>;

  const icon = (
    <div className="mr5 fs-m">
      <HeartOutlined />
    </div>
  );

  if (isSupportingEvent) {
    return (
      <div className="flex-c flex-jc-sb">
        {icon}
        {isSupportingEvent ? 'Already supported!' : 'Support'}
      </div>
    );
  } else {
    return (
      <div onClick={handleSubmit} className="flex-c fc-primary fw-700 click">
        {icon}
        <div>Support</div>
      </div>
    );
  }
};

export default EventItemHeaderSupport;

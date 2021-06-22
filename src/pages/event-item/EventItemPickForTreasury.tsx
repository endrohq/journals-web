import React from 'react';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { Button } from 'antd';
import { ModalType, TxConfirmationProps } from '../../components/modals';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { getEventDetailsRoute, ROUTES } from '../../shared/router/routes';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { Event } from '../../typings';
import { HeartOutlined } from '@ant-design/icons';

interface Props {
  event: Event;
}

const EventItemPickForTreasury: React.FC<Props> = ({ event }) => {
  const { account } = useWallet();
  const { client } = useClient();
  const history = useHistory();
  const { openModal } = useModal();

  async function handleSubmit() {
    const transaction = await client.transaction.create(
      {
        moduleID: 1025,
        assetID: 1,
        nonce: BigInt(account.sequence.nonce),
        senderPublicKey: Buffer.from(account.keys.publicKey, 'hex'),
        fee: BigInt(1100000000),
        asset: {
          eventId: event.id
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
        let route = tx?.asset?.id
          ? getEventDetailsRoute(tx.asset.id)
          : ROUTES.HOME;
        history.push(route);
      }
    });
  }

  return (
    <Button icon={<HeartOutlined />} onClick={handleSubmit}>
      Support
    </Button>
  );
};

export default EventItemPickForTreasury;

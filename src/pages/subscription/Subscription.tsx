import React, { useEffect, useState } from 'react';
import { useClient, useBlock, useWallet } from '@lisk-react/use-lisk';
import { Subscription } from '../../typings';
import { Loading } from '../../components/loaders/Loading';
import { SubscriptionItem } from './SubscriptionItem';
import { Button } from 'antd';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { CrownOutlined } from '@ant-design/icons';
import { ENV } from '../../env';
import { fromRawLsk } from '../../utils/currency-converters';
import { isArrayWithElements } from '../../utils/type.utils';
import { CreateSubscriptionProps, ModalType } from '../../components/modals';
import { useModal } from '../../hooks/useModal';

interface Props {}

const SubscriptionPage: React.FC<Props> = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { account } = useWallet();
  const { client } = useClient();
  const { block } = useBlock();
  const { openModal } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = (await client.invoke('treasury:getSubscriptions', {
        address: account.address
      })) as Subscription[];
      console.log(data);
      setSubscriptions(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function createSubscription() {
    openModal<CreateSubscriptionProps>(ModalType.CREATE_SUBSCRIPTION, {
      data: {
        refresh: fetchData
      }
    });
  }

  if (loading) {
    return (
      <div className="grid-xl mt50 mb200">
        <Loading />
      </div>
    );
  }

  const activeSubscription = subscriptions.find(
    item =>
      item.expiresAt > block?.header?.height &&
      item.startsAt < block?.header?.height
  );

  let pastSubscriptions = [...subscriptions].filter(
    item => item.id !== activeSubscription?.id
  );

  return (
    <div className="grid-xl mt50 mb200">
      <div className="w100 mb50 flex-fs flex-jc-sb">
        <div className="w75">
          <h1 className="fw-700 p0 m0">Subscription</h1>
          <div className="w100">
            <p className="fs-m">
              A subscription will provide you with an ability to fund content
              writers.
            </p>
          </div>
        </div>
      </div>
      <div className="w100 mb25 pb25 border-bottom">
        <div className="flex-c mb25">
          <div className="img--40 circle bgc-lblue flex-c flex-jc-c mr15">
            <CrownOutlined className="fs-xm" />
          </div>{' '}
          <h3 className="p0 m0">Current Subscription</h3>
        </div>
        <div className="flex-c pl25 pr25 pt10 pb10 rounded-top bg-gray-200">
          <div className="w20">ID</div>
          <div className="w20">Start Block Height</div>
          <div className="w20">End Block Height</div>
        </div>
        {activeSubscription ? (
          <SubscriptionItem
            subscription={activeSubscription}
            blockHeight={block.header.height}
          />
        ) : (
          <div className="p15 bg-white flex-c border-dashed rounded flex-jc-sb">
            <div className="p15 w100 mr25 bg-gray-100">
              No active subscription found.. Start a new subscription for{' '}
              <b>
                {fromRawLsk(TRANSACTION_COSTS.CREATE_SUBSCRIPTION)} {ENV.TICKER}
              </b>{' '}
              to sponsor event creators and the wider ecosystem
            </div>
            <div className="flex-column flex-fe">
              <Button
                block
                type="primary"
                className="w175--fixed h45--fixed"
                onClick={createSubscription}>
                Start subscription
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="w100">
        <div className="mb15">
          <h3>Past Subscriptions ({subscriptions?.length || 0})</h3>
        </div>
        <div className="flex-c pl25 pr25 pt10 pb10 rounded-top bg-gray-200">
          <div className="w20">ID</div>
          <div className="w20">Start Block Height</div>
          <div className="w20">End Block Height</div>
        </div>
        <div>
          {isArrayWithElements(pastSubscriptions) ? (
            pastSubscriptions.map(item => (
              <SubscriptionItem
                subscription={item}
                blockHeight={block.header.height}
              />
            ))
          ) : (
            <div className="bg-white p15-25 fc-gray-500 border">
              No past subscriptions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;

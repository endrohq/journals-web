import React, { useEffect, useState } from 'react';
import { SubscriptionList } from './SubscriptionList';
import { useLiskClient, useLiskWallet } from '@lisk-react/use-lisk';
import { Subscription } from '../../typings';
import { Loading } from '../../components/loaders/Loading';

interface Props {}

const SubscriptionPage: React.FC<Props> = () => {
  const [subscription, setSubscription] = useState<Subscription>();
  const [loading, setLoading] = useState<boolean>(true);
  const { account } = useLiskWallet();
  const { client } = useLiskClient();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = (await client.invoke('treasury:getSubscription', {
        address: account.address
      })) as Subscription;
      setSubscription(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="grid-xl mt50 mb200">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid-xl mt50 mb200">
      <div>
        <h1 className="fw-700">Subscription</h1>
        <div className="w40">
          <p className="fs-m">
            A subscription will provide you with an ability to fund content
            writers.
          </p>
          <div>
            <pre>{JSON.stringify(subscription, null, 2)}</pre>
          </div>
        </div>
      </div>
      <SubscriptionList />
    </div>
  );
};

export default SubscriptionPage;

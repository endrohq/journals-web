import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/loaders/Loading';
import { LiskAccount } from '@lisk-react/types';
import { useClient } from '@lisk-react/use-lisk';
import { SupportedEvent } from '../../typings';
import { isArrayWithElements } from '../../utils/type.utils';
import { AccountSupportedEventsNotFound } from './AccountSupportedEventsNotFound';
import { AccountSupportedEventsItem } from './AccountSupportedEventsItem';

interface ContainerProps {
  account: LiskAccount;
}

export const AccountSupportedEvents: React.FC<ContainerProps> = ({
  account
}) => {
  const [events, setEvents] = useState<SupportedEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {
    client,
    network: { isConnected }
  } = useClient();

  async function fetchData() {
    try {
      const data = (await client.invoke('treasury:getSupportedEvents', {
        address: account?.address
      })) as SupportedEvent[];
      setEvents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isConnected) {
      fetchData();
    }
  }, [isConnected]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex-c fw-bold pt10 pb10 fc-lb br-t br-b fs-s">
        <span className="w20">EventId</span>
      </div>
      {!isArrayWithElements(events) ? (
        <AccountSupportedEventsNotFound />
      ) : (
        events.map((event, index) => (
          <AccountSupportedEventsItem key={index} event={event} />
        ))
      )}
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { useClient } from '@lisk-react/use-lisk';
import { Loading } from '../../components/loaders/Loading';
import { HomeEventsItem } from './HomeEventsItem';
import { Event } from '../../typings';

interface ContainerProps {}

export const HomeEvents: React.FC<ContainerProps> = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {
    client,
    network: { isConnected }
  } = useClient();

  async function fetchData() {
    try {
      const data = (await client.invoke('event:find')) as any[];
      console.log(data);
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
    <div className="grid-col4 mt50">
      {events.map((item, idx) => (
        <HomeEventsItem event={item} key={idx} />
      ))}
    </div>
  );
};

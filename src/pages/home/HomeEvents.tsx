import React, { useEffect, useState } from 'react';
import { useClient } from '@lisk-react/use-lisk';
import { Loading } from '../../components/loaders/Loading';
import { HomeEventsItem } from './HomeEventsItem';
import { NewsEvent } from '../../typings';
import { HomeEventsHeadlinePrimary } from './HomeEventsHeadlinePrimary';

interface ContainerProps {}

export const HomeEvents: React.FC<ContainerProps> = () => {
  const [events, setEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {
    client,
    network: { isConnected }
  } = useClient();

  async function fetchData() {
    try {
      const data = (await client.invoke('events:find')) as any[];
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

  const firstEvent = events.pop();
  console.log(firstEvent);

  return (
    <>
      <div className=" home-events--grid h350--fixed">
        <HomeEventsHeadlinePrimary event={firstEvent} />
        <div className="event-grid-side">
          <div className="rounded-1 bg-gray-300">
            <div className=" p15" />
          </div>
          <div className="rounded-1 bg-gray-300">
            <div className="  p15" />
          </div>
        </div>
      </div>
      <div className="grid-col4 mt50">
        {events.map((item, idx) => (
          <HomeEventsItem event={item} key={idx} />
        ))}
      </div>
    </>
  );
};

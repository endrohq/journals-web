import React, { useEffect, useState } from 'react';
import { useClient } from '@lisk-react/use-lisk';
import { Loading } from '../../components/loaders/Loading';
import { HomeEventsItem } from './HomeEventsItem';
import { NewsEvent } from '../../typings';
import { Link } from 'react-router-dom';
import { getEventDetailsRoute } from '../../shared/router/routes';

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

  return (
    <>
      <div className="flex-fs flex-jc-sb">
        <Link
          to={getEventDetailsRoute(firstEvent?.id)}
          className="w70 resp-container rounded-1 bg-gray-200 mr25">
          <div className="resp-iframe p15">{firstEvent?.title}</div>
        </Link>
        <div className="w30">
          <div className="w100 resp-container rounded-1 mb25 bg-gray-200">
            <div className="resp-iframe p15" />
          </div>
          <div className="w100 resp-container rounded-1 bg-gray-200">
            <div className="resp-iframe  p15" />
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

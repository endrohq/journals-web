import React, { useEffect, useState } from 'react';
import { useLiskClient } from '@lisk-react/use-lisk';
import { Loading } from '../../components/loaders/Loading';

interface ContainerProps {}

export const HomeEvents: React.FC<ContainerProps> = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {
    client,
    network: { isConnected }
  } = useLiskClient();

  async function fetchData() {
    try {
      const data = (await client.invoke('event:getAll')) as any[];
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

  console.log(events);

  return (
    <div className="grid-col4 mt50">
      {events.map((item, idx) => (
        <div
          key={idx}
          className="bg-gray-200 p15 fc-black rounded-1 h200--fixed">
          {item.title}
        </div>
      ))}
    </div>
  );
};

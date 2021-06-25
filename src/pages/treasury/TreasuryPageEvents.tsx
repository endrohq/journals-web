import { FC, useEffect, useState } from 'react';
import { useClient } from '@lisk-react/use-lisk';
import { Loading } from '../../components/loaders/Loading';
import { NewsEvent } from '../../typings';
import { TreasuryPageEventsItem } from './TreasuryPageEventsItem';

const TreasuryPageTopEvents: FC = () => {
  const [events, setEvents] = useState<NewsEvent[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const {
    client,
    network: { isConnected }
  } = useClient();

  useEffect(() => {
    if (isConnected && client) {
      getTopEvents();
    }
  }, [isConnected]);

  async function getTopEvents() {
    try {
      const data = (await client.invoke(
        'treasury:getEventsForCurrentRound'
      )) as NewsEvent[];
      setEvents(data);
    } catch (e) {
      console.log(e);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="grid mt75 flex-c flex-jc-c">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w100 mt50">
      <div className="mb25">
        <h3>Popular events</h3>
      </div>
      {events.map((item, idx) => (
        <TreasuryPageEventsItem event={item} key={idx} />
      ))}
    </div>
  );
};

export default TreasuryPageTopEvents;

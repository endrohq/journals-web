import React, { useEffect, useState } from 'react';
import { useLiskClient } from '@lisk-react/use-lisk';
import { Loading } from '../../components/loaders/Loading';
import { useParams } from 'react-router';
import { Event } from '../../typings';

interface Props {}

const EventItem: React.FC<Props> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(true);
  const {
    client,
    network: { isConnected }
  } = useLiskClient();

  async function fetchData() {
    try {
      const data = (await client.invoke('event:findOne', { id })) as Event;
      setEvent(data);
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
    <div className="grid-xl mt50 ">
      <div className="mt50 flex-fs">
        <div className="w25 bg-white p5 border h150--fixed">xx</div>
        <div className="w50 ml25 mr25">
          <div className="resp-container p5 border bg-white mb25">
            <div className="resp-iframe " />
          </div>
          <div>
            <h1 className="fw-700 fs-l p0 m0">{event.title}</h1>
            <p>{event.description}</p>
          </div>
        </div>
        <div className="w25 bg-white p5 border h225--fixed">xx</div>
      </div>
    </div>
  );
};

export default EventItem;

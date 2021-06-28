import React, { useEffect, useState } from 'react';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { Loading } from '../../components/loaders/Loading';
import { useParams } from 'react-router';
import { NewsEvent } from '../../typings';
import EventItemSupport from './EventItemSupport';

interface Props {}

const EventItem: React.FC<Props> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<NewsEvent>();
  const [loading, setLoading] = useState<boolean>(true);
  const {
    client,
    network: { isConnected }
  } = useClient();
  const { account } = useWallet();

  async function fetchData() {
    try {
      const data = (await client.invoke('events:getEvent', {
        id,
        address: account?.address
      })) as NewsEvent;
      setEvent(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function refresh() {
    fetchData();
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
    <div className="w90 m-auto mt50 ">
      <div className="mt50 flex-c flex-jc-sb">
        <div className="w75">
          <h1 className="fw-700 fs-l p0 m0">{event.title}</h1>
          <p>{event.description}</p>
        </div>
        <div className="w25">
          <EventItemSupport event={event} refresh={refresh} />
        </div>
      </div>
      <div className="mt50 flex-fs">
        <div className="w25 bg-white p5 border h150--fixed">xx</div>
        <div className="w50 ml25 mr25">
          <div className="resp-container p5 border bg-white mb25">
            <div className="resp-iframe " />
          </div>
        </div>
        <div className="w25"></div>
      </div>
    </div>
  );
};

export default EventItem;

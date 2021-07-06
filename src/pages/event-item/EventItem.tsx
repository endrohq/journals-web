import React, { useEffect, useState } from 'react';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { Loading } from '../../components/loaders/Loading';
import { useParams } from 'react-router';
import { NewsEvent } from '../../typings';
import { EventItemLocation } from './EventItemLocation';
import { EventItemGallery } from './EventItemGallery';
import { EventItemHeader } from './EventItemHeader';

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
    <div className="w70 m-auto mt50">
      <EventItemHeader event={event} refresh={refresh} />
      <EventItemGallery videoId={event.videoId} />
      <div className="mt50 flex-fs flex-jc-sb">
        <div className="w70 bg-white border rounded-1">
          <div className="">
            <div className="p15-25 rounded-top bg-gray-100">Video labels</div>
            {event?.labels?.map((item, idx) => (
              <div
                className={`p15-25 ${
                  idx !== event?.labels?.length - 1 ? 'border-bottom' : ''
                }`}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="w25">
          <EventItemLocation
            longitude={event.longitude}
            latitude={event.latitude}
          />
        </div>
      </div>
    </div>
  );
};

export default EventItem;

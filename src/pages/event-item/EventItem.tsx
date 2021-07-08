import React, { useEffect, useState } from 'react';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { Loading } from '../../components/loaders/Loading';
import { useParams } from 'react-router';
import { NewsEvent } from '../../typings';
import { EventItemLocation } from './EventItemLocation';
import { EventItemGallery } from './EventItemGallery';
import { EventItemHeader } from './EventItemHeader';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/router/routes';
import { normalize } from '../../utils/object.utils';
import { EventItemLabels } from './EventItemLabels';
import { EventItemTimeline } from './EventItemTimeline';
import { EventItemEntities } from './EventItemEntities';

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
      const data = await client.invoke('events:getEvent', {
        id,
        address: account?.address
      });
      if (data) {
        const event = normalize(data) as NewsEvent;
        setEvent(event);
      }
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
    if (isConnected && !event) {
      fetchData();
    }
  }, [isConnected]);

  if (loading) {
    return (
      <div className="mt50">
        <Loading />
      </div>
    );
  } else if (!event) {
    return (
      <div className="w70 m-auto mt125">
        <div className="w50">
          <h1 className="fw-bold fs-xl w70">
            Oops, The page you are searching does not exist.
          </h1>
          <p className="w70 fs-m mb25">
            Looks like the page you requested does not exist or changed
            location. Make sure to double check the URL.
          </p>
          <Link to={ROUTES.HOME}>
            <Button type="primary">Go home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w70 m-auto mt50 mb50">
      <EventItemHeader event={event} refresh={refresh} />
      <EventItemGallery activity={event?.activity} />
      <div className="mt25 flex-fs flex-jc-sb">
        <div className="w70">
          <EventItemLabels labelStats={event.labelStats} />
          <EventItemEntities activity={event.activity} />
          <EventItemTimeline activity={event.activity} />
        </div>
        <div className="w25">
          <EventItemLocation activity={event?.activity} />
        </div>
      </div>
    </div>
  );
};

export default EventItem;

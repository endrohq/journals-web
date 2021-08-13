import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEventDetailsRoute } from '../../shared/router/routes';
import { NewsEvent, OpenStreetLocation } from '../../typings';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

interface ContainerProps {
  event: NewsEvent;
}

export const HomeEventsHeadlinePrimary: React.FC<ContainerProps> = ({
  event
}) => {
  const uri = getEventDetailsRoute(event?.id);
  const primaryImage = event?.activity
    .map(item => item?.media.map(media => media?.thumbnailCid))
    .flat(2)?.[0];
  const label = event?.activity?.[0].media?.[0].labels[0];

  const location = useMemo(() => {
    return event?.activity[event?.activity?.length - 1].location;
  }, [event]);

  const [openStreetLocation, setOpenStreetLocation] =
    useState<OpenStreetLocation>();

  const provider = useMemo(() => {
    return new OpenStreetMapProvider();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    const results = await provider.search({
      query: `${location.latitude}, ${location.longitude}`
    });
    console.log(results);
    setOpenStreetLocation(results[0]);
  }

  return (
    <Link
      style={{
        background: `url(https://ipfs.io/ipfs/${primaryImage})`,
        backgroundSize: 'cover'
      }}
      to={uri}
      className="h100 w100 event-grid-primary rounded-1">
      <div
        style={{
          backgroundColor: !!event ? 'rgba(0,0,0,0.4)' : '#e2e2e2'
        }}
        className="w100 h100 rounded-1 flex-fe">
        <div className="pl50 pb25">
          <h1 className="lh-normal fc-white p0 m0 mb10 fw-700">{label}</h1>
          <h3 className="fc-gray-100 p0 m0 w70">{openStreetLocation?.label}</h3>
        </div>
      </div>
    </Link>
  );
};

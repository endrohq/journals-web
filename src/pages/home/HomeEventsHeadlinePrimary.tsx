import React from 'react';
import { Link } from 'react-router-dom';
import { getEventDetailsRoute } from '../../shared/router/routes';
import { NewsEvent } from '../../typings';
import { ENV } from '../../env';

interface ContainerProps {
  event: NewsEvent;
}

export const HomeEventsHeadlinePrimary: React.FC<ContainerProps> = ({
  event
}) => {
  const uri = getEventDetailsRoute(event?.id);
  const primaryImage = event?.activity
    .map(item => item?.media.map(media => media?.mediaId))
    .flat(2)?.[0];
  return (
    <Link
      style={{
        background: `url(${ENV.IMAGES_CDN}/${primaryImage})`,
        backgroundSize: 'cover'
      }}
      to={uri}
      className="h100 w100 event-grid-primary rounded-1">
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.4)'
        }}
        className="w100 h100 rounded-1 flex-fe">
        <div className="p50">
          <h1 className="lh-normal fc-white p0 m0 fw-700">{event?.title}</h1>
        </div>
      </div>
    </Link>
  );
};

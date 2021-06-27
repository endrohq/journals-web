import React from 'react';
import { NewsEvent } from '../../typings';
import { ENV } from '../../env';
import { getEventDetailsRoute } from '../../shared/router/routes';
import { Link } from 'react-router-dom';

interface ContainerProps {
  event: NewsEvent;
}

export const TreasuryPageEventsItem: React.FC<ContainerProps> = ({ event }) => {
  return (
    <div className="w100 bg-white p15-25 fc-black rounded-1 flex-c">
      <div className="w40 flex-c">
        <div className="img--30 rounded-1 bg-gray-200 mr25" />
        <Link to={getEventDetailsRoute(event.id)}>{event.title}</Link>
      </div>
      <div className="fw-700 w25">{event.supporters}</div>
      <div className="fw-700">
        ~ {event.funding || 0} {ENV.TICKER}
      </div>
    </div>
  );
};

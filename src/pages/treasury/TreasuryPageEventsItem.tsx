import React from 'react';
import { Link } from 'react-router-dom';
import { getEventDetailsRoute } from '../../shared/router/routes';
import { Event } from '../../typings';

interface ContainerProps {
  event: Event;
}

export const TreasuryPageEventsItem: React.FC<ContainerProps> = ({ event }) => {
  const uri = getEventDetailsRoute(event.id);
  return (
    <Link to={uri} className="bg-gray-200 p15 fc-black rounded-1 h200--fixed">
      {event.title}
    </Link>
  );
};

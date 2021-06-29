import React from 'react';
import { SupportedEvent } from '../../typings';

interface ContainerProps {
  event: SupportedEvent;
}

export const AccountSupportedEventsItem: React.FC<ContainerProps> = ({
  event
}) => {
  return <div className="flex-c pb15 pt15">{event.eventId}</div>;
};

import React from 'react';
import { NewsEvent } from '../../typings';

interface ContainerProps {
  event: NewsEvent;
}

export const TreasuryPageEventsItem: React.FC<ContainerProps> = ({ event }) => {
  return (
    <div className="w100 bg-white border p15 fc-black rounded-1 flex-c">
      <div className="img--30 rounded-1 bg-gray-200 mr25" />
      <div className="w25">{event.title}</div>
    </div>
  );
};

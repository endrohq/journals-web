import React from 'react';
import { NewsEvent } from '../../typings';

interface ContainerProps {
  event?: NewsEvent;
}

export const HomeEventsItem: React.FC<ContainerProps> = ({ event }) => {
  return (
    <div className="mb25">
      <div className="bg-gray-300 p15 fc-black rounded-1 h150--fixed" />
      <div className="mt15">
        <div className="bg-gray-300 w80 h15--fixed rounded-pill mb10" />
        <div className="bg-gray-300 w50 h15--fixed rounded-pill" />
      </div>
    </div>
  );
};

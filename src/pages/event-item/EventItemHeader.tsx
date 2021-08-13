import { FC, useEffect, useMemo, useState } from 'react';
import { NewsEvent, OpenStreetLocation } from '../../typings';
import EventItemHeaderSupport from './EventItemHeaderSupport';
import { useModal } from '../../hooks/useModal';
import { LocationProps, ModalType } from '../../components/modals';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { ENV } from '../../env';
import { MoneyIcon } from '../../components/icons/MoneyIcon';

interface Props {
  event: NewsEvent;
  refresh(): void;
}

export const EventItemHeader: FC<Props> = ({ event, refresh }) => {
  const { openModal } = useModal();

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
    setOpenStreetLocation(results[0]);
  }

  function openModalMap() {
    openModal<LocationProps>(ModalType.LOCATION, {
      width: '70%',
      data: {
        location: event?.activity?.map(item => item.location),
        openStreetLocation
      }
    });
  }

  return (
    <div className="mt50 mb15">
      <h1 className="fw-700 fs-xxl p0 m0 lh-normal mb10">{event.title}</h1>
      <div className="flex-c ">
        <div className="flex-c ">
          <div className="mr10 fc-primary fs-xm lh-none">
            <MoneyIcon />
          </div>
          <div className="">
            <span className="fw-700 fc-primary">
              {event.treasury?.funding || 0} {ENV.TICKER}
            </span>{' '}
            in funding (
            <span className="fc-gray-700 fw-700">
              {event?.treasury?.supporters || 0} supporter
              {event?.treasury?.supporters !== 1 && 's'}
            </span>
            )
          </div>
        </div>
        <div className="ml10 mr10 fc-gray-300">•</div>
        <div onClick={openModalMap} className="click fc-primary underline">
          {openStreetLocation?.label?.length - 1 > 50
            ? `${openStreetLocation?.label.substr(0, 50)}..`
            : openStreetLocation?.label}
        </div>

        <div className="ml-auto flex-c">
          <div className="ml25">
            <EventItemHeaderSupport event={event} refresh={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

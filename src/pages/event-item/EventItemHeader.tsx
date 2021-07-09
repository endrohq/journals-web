import { FC, useEffect, useMemo, useState } from 'react';
import { NewsEvent, OpenStreetLocation } from '../../typings';
import {
  PlusCircleOutlined,
  TeamOutlined,
  HeartOutlined
} from '@ant-design/icons';
import EventItemHeaderSupport from './EventItemHeaderSupport';
import { useModal } from '../../hooks/useModal';
import {
  ContributeToEventProps,
  LocationProps,
  ModalType
} from '../../components/modals';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

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

  function handleContribute() {
    openModal<ContributeToEventProps>(ModalType.CONTRIBUTE_TO_EVENT, {
      data: {
        eventId: event.id,
        refresh
      },
      shouldBeAuthenticated: true
    });
  }

  function openModalMap() {
    openModal<LocationProps>(ModalType.LOCATION, {
      width: '70%',
      data: {
        location,
        openStreetLocation
      }
    });
  }

  return (
    <div className="mt50 mb15">
      <h1 className="fw-700 fs-xxl p0 m0 lh-normal mb10">{event.title}</h1>
      <div className="flex-c">
        <div className="flex-c fc-primary">
          <div className="mr5 fs-m ">
            <HeartOutlined />
          </div>
          <div>{event.supporters || 0} supporters</div>
        </div>
        <div className="ml10 mr10 fc-gray-300">•</div>
        <div className="flex-c fc-primary">
          <div className="mr5 fs-m ">
            <TeamOutlined />
          </div>
          <div>{event.supporters || 0} contributors</div>
        </div>
        <div className="ml10 mr10 fc-gray-300">•</div>
        <div onClick={openModalMap} className="click fc-primary fw-700">
          {openStreetLocation?.label?.length - 1 > 50
            ? `${openStreetLocation?.label.substr(0, 50)}..`
            : openStreetLocation?.label}
        </div>

        <div className="ml-auto flex-c">
          <div onClick={handleContribute} className="flex-c click lh-none">
            <PlusCircleOutlined className="mr5 fs-m p0 m0 " />
            <div className="">Contribute</div>
          </div>
          <div className="ml25">
            <EventItemHeaderSupport event={event} refresh={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

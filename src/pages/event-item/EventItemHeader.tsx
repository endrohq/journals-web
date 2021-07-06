import { FC } from 'react';
import { NewsEvent } from '../../typings';
import { HeartFilled, PlusCircleOutlined } from '@ant-design/icons';
import EventItemActionBarSupport from './EventItemActionBarSupport';
import { useModal } from '../../hooks/useModal';
import { ContributeToEventProps, ModalType } from '../../components/modals';

interface Props {
  event: NewsEvent;
  refresh(): void;
}

export const EventItemHeader: FC<Props> = ({ event, refresh }) => {
  const { openModal } = useModal();

  function handleContribute() {
    openModal<ContributeToEventProps>(ModalType.CONTRIBUTE_TO_EVENT, {
      data: {
        eventId: event.id
      },
      shouldBeAuthenticated: true
    });
  }

  return (
    <div className="mt50 mb15">
      <h1 className="fw-700 fs-xxl p0 m0 lh-normal mb10">{event.title}</h1>
      <div className="flex-c">
        <div className="flex-c fc-blue">
          <div className="mr5 fs-m ">
            <HeartFilled />
          </div>
          <div>{event.supporters || 0} supporters</div>
        </div>

        <div className="ml-auto flex-c">
          <div onClick={handleContribute} className="flex-c click lh-none">
            <PlusCircleOutlined className="mr5 fs-m p0 m0 " />
            <div className="">Contribute</div>
          </div>
          <div className="ml25">
            <EventItemActionBarSupport event={event} refresh={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

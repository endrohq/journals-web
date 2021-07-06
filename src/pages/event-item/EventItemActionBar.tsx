import { FC } from 'react';
import { NewsEvent } from '../../typings';
import EventItemActionBarSupport from './EventItemActionBarSupport';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useModal } from '../../hooks/useModal';
import { ContributeToEventProps, ModalType } from '../../components/modals';

interface Props {
  event: NewsEvent;
  refresh(): void;
}

export const EventItemActionBar: FC<Props> = ({ event, refresh }) => {
  const { openModal } = useModal();

  function handleContribute() {
    openModal<ContributeToEventProps>(ModalType.CONTRIBUTE_TO_EVENT, {
      data: {
        eventId: event.id
      }
    });
  }

  return (
    <div className="mb25 w100 border-bottom flex-c">
      <div className="border-right click bgc-grey__hover h100 p15-25">
        <div onClick={handleContribute} className="flex-c lh-none">
          <PlusCircleOutlined className="fs-xm p0 m0 " />
          <div className="ml15">Contribute</div>
        </div>
      </div>
      <div className="w25 h100 ml-auto">
        <EventItemActionBarSupport event={event} refresh={refresh} />
      </div>
    </div>
  );
};

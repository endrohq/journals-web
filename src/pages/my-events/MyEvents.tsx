import { FC } from 'react';
import { MyEventsList } from './MyEventsList';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  eventId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const MyEvents: FC<Props> = ({ match }) => {
  const { eventId } = match?.params;
  return (
    <div className="grid mt50">
      <h1 className="fw-700">My Uploads</h1>
      <MyEventsList activeEventId={eventId} />
    </div>
  );
};

export default MyEvents;

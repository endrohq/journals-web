import { FC } from 'react';
import { MyNewsList } from './MyNewsList';
import { RouteComponentProps } from 'react-router';

interface MatchParams {
  eventId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const MyNews: FC<Props> = ({ match }) => {
  const { eventId } = match?.params;
  return (
    <div className="grid mt50">
      <h1 className="fw-700">My News</h1>
      <MyNewsList activeEventId={eventId} />
    </div>
  );
};

export default MyNews;

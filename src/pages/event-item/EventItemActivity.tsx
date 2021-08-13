import { FC } from 'react';
import { NewsEventActivity } from '../../typings';
import { NewsActivity } from '../../components/news-activity/NewsActivity';

interface Props {
  activity: NewsEventActivity[];
}

export const EventItemActivity: FC<Props> = ({ activity }) => {
  return (
    <div className="mb10">
      <div className="mb10 fs-m fw-700">Activity</div>
      <div className="">
        {activity?.map((item, idx) => (
          <NewsActivity
            activity={item}
            isLastActivity={idx === activity?.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

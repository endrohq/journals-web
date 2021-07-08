import { FC } from 'react';
import { NewsEventActivity, NewsHistoryTypes } from '../../typings';
import { getShortenedFormat } from '../../utils/string.utils';
import { Link } from 'react-router-dom';
import {
  getAccountDetailsRoute,
  getTransactionDetailsRoute
} from '../../shared/router/routes';
import { getFormattedDate } from '../../utils/date.utils';
import { FileTextOutlined } from '@ant-design/icons';

interface Props {
  activity: NewsEventActivity;
}

export const NewsActivityHeader: FC<Props> = ({ activity }) => {
  const isEventCreated = activity.type === NewsHistoryTypes.EVENT_CREATED;
  const accountURI = getAccountDetailsRoute(activity.createdBy);
  return (
    <div className="w100 flex-c mb15 ">
      <div>
        <span>
          Event {isEventCreated ? 'created' : 'updated'} by{' '}
          <Link to={accountURI} className="p0 m0 fw-700">
            {activity.createdBy && getShortenedFormat(activity.createdBy)}
          </Link>
        </span>
        <div className="p0 m0 fc-gray-700 fs-s">
          {getFormattedDate(activity.transactionDate)}
        </div>
      </div>
      <div className="ml-auto">
        <Link
          className="flex-c"
          to={getTransactionDetailsRoute(activity.transactionHash)}>
          <FileTextOutlined />
          <div className="ml10">
            {getShortenedFormat(activity.transactionHash)}
          </div>
        </Link>
      </div>
    </div>
  );
};

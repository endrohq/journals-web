import { FC } from 'react';
import { NewsEventActivity, NewsHistoryTypes } from '../../typings';
import { AppstoreAddOutlined, BuildOutlined } from '@ant-design/icons';
import { NewsActivityHeader } from './NewsActivityHeader';

interface Props {
  isLastActivity: boolean;
  activity: NewsEventActivity;
}

export const NewsActivity: FC<Props> = ({ activity, isLastActivity }) => {
  const isEventCreated = activity.type === NewsHistoryTypes.EVENT_CREATED;
  return (
    <div
      className={`w100 p15-25 rounded-1 border bg-white flex-fs ${
        !isLastActivity ? ' mb15' : ''
      }`}>
      <div className="img--40 circle bg-gray-200 flex-c flex-jc-c fs-xm lh-none mr15">
        {isEventCreated ? <BuildOutlined /> : <AppstoreAddOutlined />}
      </div>
      <div className="w100">
        <NewsActivityHeader activity={activity} />
        <div className="">
          <div className="mb25 w100">{activity?.statement?.text}</div>
          <div className="mb15">
            {activity.media.map(item => (
              <div className="w100">
                <img
                  className="w100 image-cover rounded-top"
                  src={`https://ipfs.io/ipfs/${item.thumbnailCid}`}
                />
                <div className="bg-gray-100 p15-25 border-bottom border-left border-right rounded-bottom">
                  <div>
                    Entities:{' '}
                    {activity?.statement?.entities
                      ?.map(item => item.entity)
                      ?.toString()}
                  </div>
                  <div>Verbs: {activity?.statement?.verbs?.toString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

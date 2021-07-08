import { FC } from 'react';
import { NewsEventActivity } from '../../typings';

interface Props {
  activity: NewsEventActivity[];
}

export const EventItemEntities: FC<Props> = ({ activity }) => {
  const entities = activity.map(activity => activity.statement.entities).flat();
  return (
    <div className="flex-fs mb25">
      <div className="mr25 w15 mt5 fw-700 rounded-top bg-gray-100">
        Entities
      </div>
      <div className="flex-c flex-ww">
        {entities?.map(item => (
          <div
            key={item.entity}
            className="mr10 mb10 rounded-1 border bg-white flex-c flex-jc-sb">
            <div className="pl10 pr10">{item.entity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

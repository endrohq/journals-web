import { FC } from 'react';

interface Props {
  labelStats: Record<string, number>;
}

export const EventItemLabels: FC<Props> = ({ labelStats }) => {
  return (
    <div className="flex-fs mb25">
      <div className="mr25 w15 mt5 fw-700 rounded-top bg-gray-100">
        Event Labels
      </div>
      <div className="flex-c flex-ww">
        {Object.keys(labelStats)?.map(item => (
          <div
            key={item}
            className="mr10 mb10 rounded-1 border bg-white flex-c flex-jc-sb">
            <div className="pl10 pr10">{item}</div>
            <div className="img--30 flex-c flex-jc-c bg-gray-200 rounded-right">
              {labelStats[item]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

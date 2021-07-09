import { FC } from 'react';

interface Props {
  labelStats: Record<string, number>;
}

export const EventItemLabels: FC<Props> = ({ labelStats }) => {
  return (
    <div className="mb25">
      <div className="mb15 fs-m fw-700">Event Labels</div>
      <div className="flex-c flex-ww">
        {Object.keys(labelStats)?.map(item => {
          const bgColor =
            labelStats[item] > 1 ? 'fc-white bgc-primary' : 'bg-gray-200';
          return (
            <div
              key={item}
              className="mr5 mb5 rounded-1  border fs-s bg-white flex-c flex-jc-sb lh-none">
              <div className="pl10 pr10 ">{item}</div>
              <div
                className={`img--20 flex-c flex-jc-c ${bgColor} rounded-right`}>
                {labelStats[item]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

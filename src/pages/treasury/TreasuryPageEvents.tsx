import { FC, useEffect } from 'react';
import { NewsEvent } from '../../typings';
import { TreasuryPageEventsItem } from './TreasuryPageEventsItem';
import { isArrayWithElements } from '../../utils/type.utils';

interface Props {
  events: NewsEvent[];
}

const TreasuryPageTopEvents: FC<Props> = ({ events = [] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w100 mt50">
      <div className="mb25">
        <h3 className="p0 m0">Fund Distribution</h3>
        <p className="fc-gray-700">
          Treasury funds are distributed via the activity on news events
        </p>
      </div>
      <div className="flex-c bg-white p15-25 rounded-top ffm-bold fc-black border-bottom">
        <div className="w40">Event</div>
        <div className="w25">Supporters</div>
        <div className="">Est. Funds</div>
      </div>
      {isArrayWithElements(events) ? (
        events.map((item, idx) => (
          <TreasuryPageEventsItem event={item} key={idx} />
        ))
      ) : (
        <div className="w100 bg-white fc-gray-500 p15-25 fc-black rounded-1 flex-c">
          <div>No events are currently present</div>
        </div>
      )}
    </div>
  );
};

export default TreasuryPageTopEvents;

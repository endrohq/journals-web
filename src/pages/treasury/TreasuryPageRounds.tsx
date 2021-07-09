import { FC } from 'react';
import { TreasuryRound } from '../../typings';
import { useBlock } from '@lisk-react/use-lisk';
import { ENV } from '../../env';

interface Props {
  rounds: TreasuryRound[];
}

export const TreasuryPageRounds: FC<Props> = ({ rounds = [] }) => {
  const { block } = useBlock();
  return (
    <div className="w100 mt50">
      <div className="mb15 fw-700 fs-m">Treasury Rounds</div>
      <div className="flex-c h100--fixed border-left border-top border-bottom">
        {rounds.map((item, idx) => {
          const isActive =
            block?.header?.height > item.startsAt &&
            block?.header?.height < item.endsAt;
          return (
            <div
              className={`w25 h100 border-right flex-c flex-jc-c flex-column p15-25 ${
                isActive
                  ? 'bg-gray-200 fc-black fw-700'
                  : 'bg-white fc-gray-500'
              }`}>
              <div className="w100 flex-c flex-jc-sb">
                <div>Round {idx + 1}</div>
                <span>
                  {item.contributors || 0} subscription
                  {item.contributors !== 1 && 's'}{' '}
                </span>
              </div>
              <div className="w100  flex-c flex-jc-sb">
                <div>
                  Blocks: {item.startsAt}-{item.endsAt}
                </div>

                <span className="">
                  {item.contributors * 25} {ENV.TICKER}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

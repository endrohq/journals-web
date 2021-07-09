import { FC } from 'react';
import { Treasury } from '../../typings';
import { ENV } from '../../env';
import { fromRawLsk } from '../../utils/currency-converters';

interface Props {
  treasury: Treasury;
}

const TreasuryPageHeaderItem: FC<{
  label: string;
  value: string;
  className?: string;
  position?: 'center' | 'left';
}> = ({ label, value, className, position = 'left' }) => {
  return (
    <div
      className={` h100 pr25 flex-column flex-jc-c rounded-1 ${
        position === 'left' ? 'flex-fs' : 'flex-c'
      } ${className}`}>
      <div className="fc-gray-700 fs-m">{label}</div>
      <div className="fw-800 fs-xm fc-black">{value}</div>
    </div>
  );
};

export const TreasuryPageHeader: FC<Props> = ({ treasury }) => {
  return (
    <div className="flex-c flex-jc-sb h100--fixed mb50">
      <div>
        <h1 className="fw-700 p0 m0">Treasury</h1>
        <p className="fc-gray-700">Automated funding for news investigators</p>
      </div>
      <div className="flex-c">
        <TreasuryPageHeaderItem
          className="mr25 border-right"
          label="Round"
          position="center"
          value={`${treasury?.currentRound}`}
        />
        <TreasuryPageHeaderItem
          label="Treasury Holdings"
          className="mr25 border-right"
          position="center"
          value={`${fromRawLsk(treasury?.treasuryFunds) || 0} ${ENV.TICKER}`}
        />
        <TreasuryPageHeaderItem
          position="center"
          label="Contributors"
          value={`${treasury.subscriptionCount}`}
        />
      </div>
    </div>
  );
};

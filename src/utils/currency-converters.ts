import BigNumber from 'bignumber.js';
import numeral from 'numeral';
import 'numeral/locales';

export const fromRawLsk = (value: number) => (
  new BigNumber(value || 0).dividedBy(new BigNumber(10).pow(8)).toFixed()
);

export const toRawLsk = (value: number) => {
  const amount = numeral(value).value();
  const val = new BigNumber(10).pow(8).toNumber();
  return new BigNumber(amount * val).decimalPlaces(0).toNumber();
};

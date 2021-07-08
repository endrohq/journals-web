import moment from 'moment';

export const getFormattedDate = (timestamp: bigint) => {
  const time = Number(timestamp);
  let date = moment(time * 1000);
  let format = 'DD MMM YYYY';
  if (!timestamp || !moment(time * 1000).isValid()) {
    return '-';
  }
  return date.format(format).toLowerCase();
};

export const getCurrentUnixDate = () => {
  return parseInt((new Date().getTime() / 1000).toFixed(0));
};

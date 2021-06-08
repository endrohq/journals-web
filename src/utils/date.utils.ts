import moment from 'moment';

export const getFormattedDate = (timestamp: number) => {
  let date = moment(timestamp * 1000);
  let format = 'DD MMM YYYY';
  if (!timestamp || !moment(timestamp * 1000).isValid()) {
    return '-';
  }
  return date.format(format).toLowerCase();
};

import moment from 'moment';

export const dateFormatForServer = (date: string | any) =>
  date && moment(date).format('YYYY-MM-DD');

export const dateFormatForClient = (date: string | any) =>
  date && moment(date).format('MMMM DD YYYY');

export const getMonthNumber = (date: string): string =>
  date && moment().month(date).format('M');

import { Player } from '../types/players';

export const MONTH = {
  ['01']: 'janvier',
  ['02']: 'février',
  ['03']: 'mars',
  ['04']: 'avril',
  ['05']: 'mai',
  ['06']: 'juin',
  ['07']: 'juillet',
  ['08']: 'août',
  ['09']: 'septembre',
  ['10']: 'octobre',
  ['11']: 'novembre',
  ['12']: 'décembre',
};

export const getTodayDate = (): string => new Date().toISOString().slice(0, 10);

export const formatDate = (inputDate: string) => {
  const dateParts = inputDate.split('-');
  if (dateParts.length === 3) {
    const [year, month, day] = dateParts;
    return `${day} ${month} ${year}`;
  } else {
    return 'Format de date incorrect';
  }
};

export const getYear = () => {
  const today = getTodayDate();
  return today.split('-')[0];
};

export const getDate = (data: Player[]) =>
  Array.from(new Set(data.flatMap((player) => Object.keys(player.daysAttendance))));

export const generateDate = (inputDate: string) => {
  const dateParts = inputDate.split('-');
  return dateParts.slice(1).reverse().join(' - ');
};

export const getDatesByMonth = (dates: string[], month: string) =>
  dates.filter((date) => date.split('-')[1] === month);

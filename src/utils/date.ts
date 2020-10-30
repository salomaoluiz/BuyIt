import { format, addDays, addMinutes, isBefore } from 'date-fns';

export const getDateNow = () => Date.now();

export const formatDate = (date: Date) => {
  return format(date, 'dd/MM/yyyy');
};

export const addRemoveDays = (days: number, date: Date) => {
  return addDays(date, days);
};

export const addRemoveMinutes = (minutes: number, date: Date) => {
  return addMinutes(date, minutes);
};

export const isBeforeThan = (date: Date, dateToCompare: Date) => {
  return isBefore(date, dateToCompare);
};
export const injectTimeStamp = <
  T extends { id?: string; updatedAt?: number; createdAt?: number }
>(
  object: T,
) => {
  const updatedAt = getDateNow();
  const createdAt = getDateNow();

  if (object.createdAt) {
    return {
      ...object,
      updatedAt,
    };
  }

  return {
    ...object,
    updatedAt,
    createdAt,
  };
};

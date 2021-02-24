export type SortDate = 'createdAt' | 'updatedAt';

const sortByDate = <T extends { createdAt: number; updatedAt: number }>(
  array: T[],
  sortDate: SortDate,
): T[] => {
  return [...array].sort((a, b) => (a[sortDate] > b[sortDate] ? -1 : 1));
};

export { sortByDate };

export type SortDate = 'createdAt' | 'updatedAt';

const sortByDate = <T extends { createdAt: number; updatedAt: number }>(
  array: T[],
  sortDate: SortDate,
): T[] => {
  const sortedArray = array.sort((a, b) =>
    a[sortDate] > b[sortDate] ? -1 : 1,
  );

  return sortedArray;
};

export { sortByDate };

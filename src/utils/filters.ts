export const filterByID = <T extends { id: string }>(list: T[], id: string) =>
  list.filter((item) => item.id === id)[0];

export const filterNotByID = <T extends { id: string }>(
  list: T[],
  id?: string,
) => list.filter((item) => item.id !== id);

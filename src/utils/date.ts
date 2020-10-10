export const getDateNow = () => Date.now();

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

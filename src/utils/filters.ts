export const filterByID = <T extends { id: string }>(list: T[], id: string) =>
  list.filter((item) => item.id === id)[0];

export const filterNotByID = <T extends { id: string }>(
  list: T[],
  id?: string,
): T[] => list.filter((item) => item.id !== id);

/* 
Extraia um elemento de um objecto
*/
export const extractObjectElement = <T, Q extends keyof T & string>(
  object: T,
  extract: Q[],
): Pick<T, Exclude<keyof T, Q>> => {
  const newObject = Object.assign({}, object);

  for (const key in newObject) {
    extract.forEach((value) => {
      if (key.includes(value)) {
        delete newObject[key];
      }
    });
  }

  return newObject;
};
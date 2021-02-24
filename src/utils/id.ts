import { v4 as uuidV4 } from 'react-native-uuid';

export const generateUniqueID = () => uuidV4();

export const randomNumberId = () => {
  const id = (Math.random() * 10000000).toFixed(0);

  return parseInt(id, 0);
};

export const injectId = <T extends { id?: string }>(object: T) => {
  const id = generateUniqueID();

  if (object.id) {
    return object;
  }

  return {
    ...object,
    id,
  };
};

import { v4 as uuidV4 } from 'react-native-uuid';

export const generateUniqueID = () => {
  const id = uuidV4();

  return id;
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

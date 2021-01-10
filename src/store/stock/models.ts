import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { ProductItem } from '@store/product-list/types';

export type QueryFirestore = FirebaseFirestoreTypes.QuerySnapshot;
export type DocumentFirestore = FirebaseFirestoreTypes.QueryDocumentSnapshot;
export type DocumentReference = FirebaseFirestoreTypes.DocumentReference;

const requestStock = (userId: string) =>
  firestore().collection(`users/${userId}/stock`).get();

const createItem = (
  userId: string,
  itemId: string,
  item: Omit<ProductItem, 'id'>,
) =>
  firestore()
    .collection(`users/${userId}/stock`)
    .doc(itemId)
    .set({ ...item });

const findItem = (userId: string, itemId: string) =>
  firestore().collection(`users/${userId}/stock`).doc(itemId).get();

const updateItem = (
  userId: string,
  itemId: string,
  item: Omit<ProductItem, 'id'>,
) =>
  firestore()
    .collection(`users/${userId}/stock`)
    .doc(itemId)
    .update({ ...item });

const deleteItem = (userId: string, itemId: string) =>
  firestore().collection(`users/${userId}/stock`).doc(itemId).delete();

export { createItem, requestStock, deleteItem, updateItem, findItem };

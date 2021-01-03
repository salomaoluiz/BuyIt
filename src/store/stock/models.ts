import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { ProductItem } from '@store/product-list/types';

export type QueryFirestore = FirebaseFirestoreTypes.QuerySnapshot;
export type DocumentFirestore = FirebaseFirestoreTypes.QueryDocumentSnapshot;
export type DocumentReference = FirebaseFirestoreTypes.DocumentReference;

const getStock = (userId: string) =>
  firestore().collection(`users/${userId}/stock`).get();

const createStockItem = (
  userId: string,
  itemId: string,
  stockItem: Omit<ProductItem, 'id'>,
) =>
  firestore()
    .collection(`users/${userId}/stock`)
    .doc(itemId)
    .set({ ...stockItem });

const findStockItem = (userId: string, itemId: string) =>
  firestore().collection(`users/${userId}/stock`).doc(itemId).get();

const updateStockItem = (
  userId: string,
  itemId: string,
  stockItem: Omit<ProductItem, 'id'>,
) =>
  firestore()
    .collection(`users/${userId}/stock`)
    .doc(itemId)
    .update({ ...stockItem });

const deleteStockItem = (userId: string, itemId: string) =>
  firestore().collection(`users/${userId}/stock`).doc(itemId).delete();

export {
  createStockItem,
  getStock,
  deleteStockItem,
  updateStockItem,
  findStockItem,
};

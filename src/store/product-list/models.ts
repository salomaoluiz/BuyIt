import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { ProductList, ProductItem } from './types';

export type QueryFirestore<T> = FirebaseFirestoreTypes.QuerySnapshot<T>;
export type DocumentFirestore<T> = FirebaseFirestoreTypes.QueryDocumentSnapshot<
  T
>;
export type DocumentReference<T> = FirebaseFirestoreTypes.DocumentReference<T>;

const requestLists = (userId: string) =>
  firestore().collection(`users/${userId}/productLists`).get();

const createList = (
  userId: string,
  listId: string,
  productList: Omit<ProductList, 'id' | 'items'>,
) =>
  firestore()
    .collection(`users/${userId}/productLists`)
    .doc(listId)
    .set({ ...productList });

const findList = (userId: string, listId: string) =>
  firestore().collection(`users/${userId}/productLists`).doc(listId).get();

const updateList = (
  userId: string,
  listId: string,
  productList: Omit<ProductList, 'id' | 'items'>,
) =>
  firestore()
    .collection(`users/${userId}/productLists`)
    .doc(listId)
    .update({ ...productList });

const deleteList = (userId: string, listId: string) =>
  firestore().collection(`users/${userId}/productLists`).doc(listId).delete();

const requestItems = (userId: string, listId: string) =>
  firestore().collection(`users/${userId}/productLists/${listId}/items`).get();

const createItem = (
  userId: string,
  listId: string,
  itemId: string,
  productItem: Omit<ProductItem, 'id'>,
) =>
  firestore()
    .collection(`users/${userId}/productLists/${listId}/items`)
    .doc(itemId)
    .set({ ...productItem });

const findItem = (userId: string, listId: string, itemId: string) =>
  firestore()
    .collection(`users/${userId}/productLists/${listId}/items`)
    .doc(itemId)
    .get();

const updateItem = (
  userId: string,
  listId: string,
  itemId: string,
  productItem: Omit<ProductItem, 'id'>,
) =>
  firestore()
    .collection(`users/${userId}/productLists/${listId}/items`)
    .doc(itemId)
    .update({ ...productItem });

const deleteItem = (userId: string, listId: string, itemId: string) =>
  firestore()
    .collection(`users/${userId}/productLists/${listId}/items`)
    .doc(itemId)
    .delete();

export {
  requestLists,
  createList,
  updateList,
  findList,
  deleteList,
  createItem,
  requestItems,
  deleteItem,
  updateItem,
  findItem,
};

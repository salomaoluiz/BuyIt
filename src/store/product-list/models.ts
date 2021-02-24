import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { ProductList } from './types';

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
  productList: Omit<ProductList, 'id'>,
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
  productList: Omit<ProductList, 'id'>,
) =>
  firestore()
    .collection(`users/${userId}/productLists`)
    .doc(listId)
    .update({ ...productList });

const deleteList = (userId: string, listId: string) =>
  firestore().collection(`users/${userId}/productLists`).doc(listId).delete();

  export {
  requestLists,
  createList,
  updateList,
  findList,
  deleteList,
};

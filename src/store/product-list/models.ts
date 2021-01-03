import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { ProductList, ProductItem } from './types';

export type QueryFirestore<T> = FirebaseFirestoreTypes.QuerySnapshot<T>;
export type DocumentFirestore<T> = FirebaseFirestoreTypes.QueryDocumentSnapshot<T>;
export type DocumentReference<T> = FirebaseFirestoreTypes.DocumentReference<T>;

const getProductLists = (userId: string) =>
  firestore().collection(`users/${userId}/productLists`).get();

const createProductList = (
  userId: string,
  listId: string,
  productList: Omit<ProductList, 'id' | 'items'>,
) =>
  firestore()
    .collection(`users/${userId}/productLists`)
    .doc(listId)
    .set({ ...productList });

const findProductList = (userId: string, listId: string) =>
  firestore().collection(`users/${userId}/productLists`).doc(listId).get();

const updateProductList = (
  userId: string,
  listId: string,
  productList: Omit<ProductList, 'id' | 'items'>,
) =>
  firestore()
    .collection(`users/${userId}/productLists`)
    .doc(listId)
    .update({ ...productList });

const deleteProductList = (userId: string, listId: string) =>
  firestore().collection(`users/${userId}/productLists`).doc(listId).delete();

const getProductItems = (userId: string, listId: string) =>
  firestore().collection(`users/${userId}/productLists/${listId}/items`).get();

const createProductItem = (
  userId: string,
  listId: string,
  itemId: string,
  productItem: Omit<ProductItem, 'id'>,
) =>
  firestore()
    .collection(`users/${userId}/productLists/${listId}/items`)
    .doc(itemId)
    .set({ ...productItem });

const findProductItem = (userId: string, listId: string, itemId: string) =>
  firestore()
    .collection(`users/${userId}/productLists/${listId}/items`)
    .doc(itemId)
    .get();

const updateProductItem = (
  userId: string,
  listId: string,
  itemId: string,
  productItem: Omit<ProductItem, 'id'>,
) =>
  firestore()
    .collection(`users/${userId}/productLists/${listId}/items`)
    .doc(itemId)
    .update({ ...productItem });

const deleteProductItem = (userId: string, listId: string, itemId: string) =>
  firestore()
    .collection(`users/${userId}/productLists/${listId}/items`)
    .doc(itemId)
    .delete();

export {
  getProductLists,
  createProductList,
  updateProductList,
  findProductList,
  deleteProductList,
  createProductItem,
  getProductItems,
  deleteProductItem,
  updateProductItem,
  findProductItem,
};

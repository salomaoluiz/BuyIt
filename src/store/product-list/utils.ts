import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { injectTimeStamp } from '@utils/date';
import { extractObjectElement, filterNotByID } from '@utils/filters';
import { injectId } from '@utils/id';

import { QueryFirestore, DocumentFirestore } from './models';
import { ProductLists, ProductList, ProductItem } from './types';

export const formatDocumentProductList = <T>(
  productList: DocumentFirestore<T>,
): T => {
  const productData = productList.data();
  const id = productList.id;
  return {
    ...productData,
    id,
  };
};

export const formatDueDate = <T>(
  productData: T & { dueDate?: FirebaseFirestoreTypes.Timestamp },
): T => {
  if (productData.dueDate) {
    return {
      ...productData,
      dueDate: productData.dueDate.toDate(),
    };
  }
  return { ...productData };
};

export const appProductListFormater = <T>(
  productListsData: QueryFirestore<T>,
) => {
  const productLists: T[] = [];

  productListsData.forEach((item) => {
    const productData = formatDocumentProductList<T>(item);
    const productList = formatDueDate<T>(productData);
    productLists.push({
      ...productList,
    });
  });

  return productLists;
};

export const dbProductListFormated = (productList: ProductList) => {
  const filteredData = extractObjectElement<ProductList, 'id' | 'items'>(
    productList,
    ['id', 'items'],
  );

  return filteredData;
};

export const injectProductListExtraData = <T>(productList: T) => {
  const productListWithId = injectId(productList);
  const productListWithTimeStamp = injectTimeStamp(productListWithId);

  return productListWithTimeStamp;
};

export const updateProductListArray = (
  stateProductList: ProductLists,
  productList: ProductList,
) => {
  const { id } = productList;
  const filteredList = filterNotByID(stateProductList, id);
  const newProductListsArray = filteredList.concat([{ ...productList }]);

  return newProductListsArray;
};

export const createProductListArray = (
  stateProductList: ProductLists,
  productList: ProductList,
) => {
  const newProductListsArray = stateProductList.concat([{ ...productList }]);

  return newProductListsArray;
};

export const createProductItemArray = (
  productList: ProductList,
  productItem: ProductItem,
) => {
  const newProductItemsArray = productList.items
    ? productList.items.concat([{ ...productItem }])
    : [{ ...productItem }];

  const newEditedList: ProductList = {
    ...productList,
    items: newProductItemsArray,
  };

  return newEditedList;
};

import { QueryFirestore, DocumentFirestore } from './models';
import { ProductLists, ProductList, ProductItem } from './types';
import { extractObjectElement, filterNotByID } from '@utils/filters';
import { getDateNow } from '@utils/date';
import { generateUniqueID } from '@utils/id';

export const formatDocumentProductList = <T>(
  productList: DocumentFirestore,
) => {
  const productData = productList.data() as T;
  const id = productList.id;
  return {
    ...productData,
    id,
  };
};

export const appProductListFormater = <T>(productListsData: QueryFirestore) => {
  const productLists: T[] = [];

  productListsData.forEach((item) => {
    const productData = formatDocumentProductList<T>(item);

    productLists.push({
      ...productData,
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

export const injectProductListExtraData = <T extends { id: string }>(
  productList: T,
) => {
  const updatedAt = getDateNow();
  const createdAt = getDateNow();
  const id = generateUniqueID();

  if (productList.id) {
    return {
      ...productList,
      updatedAt,
    };
  }

  return {
    ...productList,
    updatedAt,
    createdAt,
    id,
  };
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

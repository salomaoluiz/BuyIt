import { ProductItem, ProductItems } from '@store/product-list/types';
import { injectTimeStamp } from '@utils/date';
import { extractObjectElement, filterNotByID } from '@utils/filters';
import { injectId } from '@utils/id';

import { QueryFirestore, DocumentFirestore } from './models';

export const formatDocumentProductList = <T>(stockItems: DocumentFirestore) => {
  const productData = stockItems.data() as T;
  const id = stockItems.id;
  return {
    ...productData,
    id,
  };
};

export const appStockItemsFormater = <T>(stockItemsData: QueryFirestore) => {
  const stockItems: T[] = [];

  stockItemsData.forEach((item) => {
    const productData = formatDocumentProductList<T>(item);

    stockItems.push({
      ...productData,
    });
  });

  return stockItems;
};

export const dbStockItemFormated = (stockItem: ProductItem) =>
  extractObjectElement<ProductItem, 'id'>(stockItem, ['id']);

export const injectStockItemExtraData = <T extends { id: string }>(
  stockItem: T,
) => {
  const stockItemWithId = injectId(stockItem);
  return injectTimeStamp(stockItemWithId);
};

export const updateStockItemArray = (
  stateStockItem: ProductItems,
  stockItem: ProductItem,
) => {
  const { id } = stockItem;
  const filteredList = filterNotByID(stateStockItem, id);
  return filteredList.concat([{ ...stockItem }]);
};

export const createStockItemArray = (
  stateStockItem: ProductItems,
  stockItem: ProductItem,
) => stateStockItem.concat([{ ...stockItem }]);

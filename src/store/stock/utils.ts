import { QueryFirestore, DocumentFirestore } from './models';
import { extractObjectElement, filterNotByID } from '@utils/filters';
import { injectTimeStamp } from '@utils/date';
import { injectId } from '@utils/id';
import { ProductItem, ProductItems } from '@store/product-list/types';

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

export const dbStockItemFormated = (stockItem: ProductItem) => {
  const filteredData = extractObjectElement<ProductItem, 'id'>(stockItem, [
    'id',
  ]);

  return filteredData;
};

export const injectStockItemExtraData = <T extends { id: string }>(
  stockItem: T,
) => {
  const stockItemWithId = injectId(stockItem);
  const stockItemWithTimeStamp = injectTimeStamp(stockItemWithId);

  return stockItemWithTimeStamp;
};

export const updateStockItemArray = (
  stateStockItem: ProductItems,
  stockItem: ProductItem,
) => {
  const { id } = stockItem;
  const filteredList = filterNotByID(stateStockItem, id);
  const newStockItemsArray = filteredList.concat([{ ...stockItem }]);

  return newStockItemsArray;
};

export const createStockItemArray = (
  stateStockItem: ProductItems,
  stockItem: ProductItem,
) => {
  const newStockItemsArray = stateStockItem.concat([{ ...stockItem }]);

  return newStockItemsArray;
};
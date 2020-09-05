import { takeLatest, select, put, call } from 'redux-saga/effects';
import {
  ProductListTypes,
  ProductListActions,
  ProductList,
  ProductLists,
  ProductItem,
} from './types';
import { productListSelectors, productListActions } from '.';
import { filterNotByID, filterByID } from '@utils/filters';
import { generateUniqueID } from '@utils/id';
import navigationService from '@navigator/services/navigationService';

export const _generateProductList = (
  stateProductList: ProductLists,
  productList: ProductList,
) => {
  const { id } = productList;

  if (id) {
    const filteredList = filterNotByID(stateProductList, id);
    const newProductListsArray = filteredList.concat([{ ...productList }]);

    return newProductListsArray;
  } else {
    const randomId = generateUniqueID();
    const newProductListsArray = stateProductList.concat([
      { ...productList, id: randomId },
    ]);

    return newProductListsArray;
  }
};

export function* setProductListAsync(
  props: ProductListActions<{ productList: ProductList }>,
) {
  const { productList } = props.payload;

  try {
    yield put(productListActions.setLoading(true));

    const stateProductList: ProductLists = yield select(
      productListSelectors.getProductLists,
    );

    const newProductListsArray = _generateProductList(
      stateProductList,
      productList,
    );

    yield put(productListActions.setProductLists(newProductListsArray));
    yield call(navigationService.goBack);
  } catch (err) {
    
    yield put(productListActions.setError(err));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export function* setProductItemAsync(
  props: ProductListActions<{ productItem: ProductItem; listId: string }>,
) {
  const { listId, productItem } = props.payload;

  const { id } = productItem;
  yield put(productListActions.setLoading(true));
  try {
    const stateProductList: ProductLists = yield select(
      productListSelectors.getProductLists,
    );
    const currentList = filterByID(stateProductList, listId);

    
    if (id) {
      const filteredListItem = filterNotByID(currentList.items, id);
      const newProductItemsArray = filteredListItem.concat([
        { ...productItem },
      ]);
      const newEditedList: ProductList = {
        ...currentList,
        items: newProductItemsArray,
      };

      const newProductListsArray = _generateProductList(
        stateProductList,
        newEditedList,
      );

      yield put(productListActions.setProductLists(newProductListsArray));
    } else {
      
      const randomId = generateUniqueID();
      const newProductItemsArray = currentList.items.concat([
        { ...productItem, id: randomId },
      ]);
      const newEditedList: ProductList = {
        ...currentList,
        items: newProductItemsArray,
      };

      const newProductListsArray = _generateProductList(
        stateProductList,
        newEditedList,
      );
      
      yield put(productListActions.setProductLists(newProductListsArray));
    }
    yield call(navigationService.goBack);
  } catch (err) {

    
    yield put(productListActions.setError(err));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export function* deleteProductItemAsync(
  props: ProductListActions<{ listId: string; itemId: string }>,
) {
  const { itemId, listId } = props.payload;

  try {
    yield put(productListActions.setLoading(true));

    const stateProductList: ProductLists = yield select(
      productListSelectors.getProductLists,
    );
    const currentList = filterByID(stateProductList, listId);

    const productItems = currentList.items;
    const filteredItems = filterNotByID(productItems, itemId);

    const newEditedList: ProductList = {
      ...currentList,
      items: filteredItems,
    };

    
    const newProductListsArray = _generateProductList(
      stateProductList,
      newEditedList,
    );
    yield put(productListActions.setProductLists(newProductListsArray));
  } catch (err) {
    yield put(productListActions.setError(err));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export function* deleteProductListAsync(
  props: ProductListActions<{ listId: string }>,
) {
  const { listId } = props.payload;

  try {
    yield put(productListActions.setLoading(true));
    const productLists: ProductLists = yield select(
      productListSelectors.getProductLists,
    );

    const filteredList = filterNotByID(productLists, listId);
    yield put(productListActions.setProductLists(filteredList));
  } catch (err) {
    yield put(productListActions.setError(err));
  } finally {
    yield put(productListActions.setLoading(false));
  }
}

export default [
  takeLatest(ProductListTypes.SET_PRODUCT_LIST_ASYNC, setProductListAsync),
  takeLatest(ProductListTypes.SET_PRODUCT_ITEM_ASYNC, setProductItemAsync),
  takeLatest(
    ProductListTypes.DELETE_PRODUCT_ITEM_ASYNC,
    deleteProductItemAsync,
  ),
  takeLatest(
    ProductListTypes.DELETE_PRODUCT_LIST_ASYNC,
    deleteProductListAsync,
  ),
];

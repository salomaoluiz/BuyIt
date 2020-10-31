import * as sagas from '../sagas';
import { productListActions } from '..';
import { put, call } from 'redux-saga/effects';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import { ProductListActions, ProductList, ProductItem } from '../types';
import * as sagaServer from '../sagas-server';
import * as sagaLocal from '../sagas-local';
import { injectProductListExtraData } from '../utils';
import navigationService from '@navigator/services/navigationService';
import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';

jest.mock('@utils/id', () => ({
  generateUniqueID: jest.fn().mockReturnValue('123456789'),
  injectId: jest.fn((object) => ({ ...object, id: '123456789' })),
}));

jest.mock('@utils/date', () => ({
  getDateNow: jest.fn().mockReturnValue(12345),
  injectTimeStamp: jest.fn((object) => ({
    ...object,
    updatedAt: 12345,
    createdAt: 1234,
  })),
}));
const productList = new ProductListBuilderMock().withName('Nome').build();

describe('ProductList Sagas', () => {
  describe('Product List', () => {
    test('deve chamar createProductListAsync corretamente', () => {
      const action = productListActions.createProductListAsync(
        productList,
      ) as ProductListActions<{
        productList: ProductList;
      }>;

      const gen = sagas.createProductListAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      const ajustedProductList = injectProductListExtraData(productList);

      expect(gen.next(ajustedProductList).value).toEqual(
        call(sagaLocal.createProductList, ajustedProductList),
      );

      expect(gen.next([ajustedProductList]).value).toEqual(
        put(productListActions.setProductLists([ajustedProductList])),
      );
      expect(gen.next().value).toEqual(call(navigationService.goBack));

      expect(gen.next(ajustedProductList).value).toEqual(
        call(sagaServer.createProductList, ajustedProductList),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('ao chamar createProductListAsync com erro deve setar o erro corretamente', () => {
      const action = productListActions.createProductListAsync(
        productList,
      ) as ProductListActions<{
        productList: ProductList;
      }>;

      const gen = sagas.createProductListAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      const ajustedProductList = injectProductListExtraData(productList);

      expect(gen.next(ajustedProductList).value).toEqual(
        call(sagaLocal.createProductList, ajustedProductList),
      );

      const error = new Error('error');
      expect(gen.throw(error).value).toEqual(
        put(productListActions.setError(error.message)),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('deve chamar getProductListsAsync corretamente', () => {
      const gen = sagas.getProductListsAsync();

      expect(gen.next().value).toEqual(put(productListActions.setError()));

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      expect(gen.next().value).toEqual(call(sagaServer.getProductLists));

      expect(gen.next([productList]).value).toEqual(
        put(productListActions.setProductLists([productList])),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('ao chamar getProductListsAsync com erro deve setar o erro corretamente', () => {
      const gen = sagas.getProductListsAsync();

      expect(gen.next().value).toEqual(put(productListActions.setError()));

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      expect(gen.next().value).toEqual(call(sagaServer.getProductLists));

      const error = new Error('error');
      expect(gen.throw(error).value).toEqual(
        put(productListActions.setError(error.message)),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('deve chamar updateProductListAsync corretamente', () => {
      const action = productListActions.updateProductListAsync(
        productList,
      ) as ProductListActions<{
        productList: ProductList;
      }>;

      const gen = sagas.updateProductListAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      const ajustedProductList = injectProductListExtraData(productList);

      expect(gen.next(ajustedProductList).value).toEqual(
        call(sagaLocal.updateProductList, ajustedProductList),
      );
      expect(gen.next([ajustedProductList]).value).toEqual(
        put(productListActions.setProductLists([ajustedProductList])),
      );
      expect(gen.next().value).toEqual(call(navigationService.goBack));

      expect(gen.next(ajustedProductList).value).toEqual(
        call(sagaServer.updateProductList, ajustedProductList),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('ao chamar updateProductListAsync com erro deve setar o erro corretamente', () => {
      const action = productListActions.updateProductListAsync(
        productList,
      ) as ProductListActions<{
        productList: ProductList;
      }>;

      const gen = sagas.updateProductListAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      const ajustedProductList = injectProductListExtraData(productList);

      expect(gen.next(ajustedProductList).value).toEqual(
        call(sagaLocal.updateProductList, ajustedProductList),
      );

      const error = new Error('error');
      expect(gen.throw(error).value).toEqual(
        put(productListActions.setError(error.message)),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('deve chamar deleteProductListAsync corretamente', () => {
      const listId = '123456';
      const mockProductLists = new ProductListBuilderMock()
        .withName('Lista')
        .build();

      const action = productListActions.deleteProductListAsync(
        listId,
      ) as ProductListActions<{
        listId: string;
      }>;

      const gen = sagas.deleteProductListAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      expect(gen.next([mockProductLists]).value).toEqual(
        call(sagaLocal.deleteProductList, listId),
      );

      expect(gen.next([mockProductLists]).value).toEqual(
        put(productListActions.setProductLists([mockProductLists])),
      );

      expect(gen.next().value).toEqual(
        call(sagaServer.deleteProductList, listId),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('ao chamar deleteProductListAsync com erro deve setar o erro corretamente', () => {
      const listId = '123456';
      const action = productListActions.deleteProductListAsync(
        listId,
      ) as ProductListActions<{
        listId: string;
      }>;

      const gen = sagas.deleteProductListAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      expect(gen.next().value).toEqual(
        call(sagaLocal.deleteProductList, listId),
      );

      const error = new Error('error');
      expect(gen.throw(error).value).toEqual(
        put(productListActions.setError(error.message)),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Product Items', () => {
    test('deve chamar createProductItemAsync corretamente', () => {
      const listId = '123456';
      const mockProductItem = new ProductItemBuilderMock()
        .withName('Lista')
        .build();
      const mockProductList = new ProductListBuilderMock()
        .withItems([mockProductItem])
        .build();

      const action = productListActions.createProductItemAsync(
        mockProductItem,
        listId,
      ) as ProductListActions<{
        productItem: ProductItem;
        listId: string;
      }>;

      const gen = sagas.createProductItemAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      const ajustedProductItem = injectProductListExtraData(mockProductItem);

      expect(gen.next([ajustedProductItem]).value).toEqual(
        call(sagaLocal.createProductItem, ajustedProductItem, listId),
      );

      expect(gen.next([mockProductList]).value).toEqual(
        put(productListActions.setProductLists([mockProductList])),
      );
      expect(gen.next().value).toEqual(call(navigationService.goBack));
      expect(gen.next().value).toEqual(
        call(sagaServer.createProductItem, ajustedProductItem, listId),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('ao chamar createProductItemAsync com erro deve setar o erro corretamente', () => {
      const listId = '123456';
      const mockProductItem = new ProductItemBuilderMock()
        .withName('Lista')
        .build();

      const action = productListActions.createProductItemAsync(
        mockProductItem,
        listId,
      ) as ProductListActions<{
        productItem: ProductItem;
        listId: string;
      }>;

      const gen = sagas.createProductItemAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      const ajustedProductItem = injectProductListExtraData(mockProductItem);

      expect(gen.next(ajustedProductItem).value).toEqual(
        call(sagaLocal.createProductItem, ajustedProductItem, listId),
      );

      const error = new Error('error');
      expect(gen.throw(error).value).toEqual(
        put(productListActions.setError(error.message)),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('deve chamar getProductItemsAsync corretamente', () => {
      const listId = '123456';
      const mockProductItem = new ProductItemBuilderMock()
        .withName('Lista')
        .build();
      const mockProductList = new ProductListBuilderMock()
        .withItems([mockProductItem])
        .build();

      const action = productListActions.getProductItemsAsync(
        listId,
      ) as ProductListActions<{
        listId: string;
      }>;

      const gen = sagas.getProductItemsAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      expect(gen.next().value).toEqual(
        call(sagaServer.getProductItems, listId),
      );

      expect(gen.next([mockProductItem]).value).toEqual(
        call(sagaLocal.getProductItems, [mockProductItem], listId),
      );

      expect(gen.next([mockProductList]).value).toEqual(
        put(productListActions.setProductLists([mockProductList])),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('ao chamar getProductItemsAsync com erro deve setar o erro corretamente', () => {
      const listId = '123456';

      const action = productListActions.getProductItemsAsync(
        listId,
      ) as ProductListActions<{
        listId: string;
      }>;

      const gen = sagas.getProductItemsAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      expect(gen.next().value).toEqual(
        call(sagaServer.getProductItems, listId),
      );

      const error = new Error('error');
      expect(gen.throw(error).value).toEqual(
        put(productListActions.setError(error.message)),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('deve chamar deleteProductItemAsync corretamente', () => {
      const listId = '123456';
      const itemId = '123456';
      const mockProductItem = new ProductItemBuilderMock()
        .withName('Lista')
        .build();
      const mockProductList = new ProductListBuilderMock()
        .withItems([mockProductItem])
        .build();

      const action = productListActions.deleteProductItemAsync(
        listId,
        itemId,
      ) as ProductListActions<{
        listId: string;
        itemId: string;
      }>;

      const gen = sagas.deleteProductItemAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      expect(gen.next().value).toEqual(
        call(sagaLocal.deleteProductItem, listId, itemId),
      );
      expect(gen.next([mockProductList]).value).toEqual(
        put(productListActions.setProductLists([mockProductList])),
      );

      expect(gen.next().value).toEqual(
        call(sagaServer.deleteProductItem, listId, itemId),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('ao chamar deleteProductItemAsync com erro deve setar o erro corretamente', () => {
      const listId = '123456';
      const itemId = '123456';

      const action = productListActions.deleteProductItemAsync(
        listId,
        itemId,
      ) as ProductListActions<{
        listId: string;
        itemId: string;
      }>;

      const gen = sagas.deleteProductItemAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      expect(gen.next().value).toEqual(
        call(sagaLocal.deleteProductItem, listId, itemId),
      );

      const error = new Error('error');
      expect(gen.throw(error).value).toEqual(
        put(productListActions.setError(error.message)),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('deve chamar updateProductItemAsync corretamente', () => {
      const listId = '123456';
      const mockProductItem = new ProductItemBuilderMock()
        .withName('Lista')
        .build();
      const mockProductList = new ProductListBuilderMock()
        .withItems([mockProductItem])
        .build();

      const action = productListActions.updateProductItemAsync(
        mockProductItem,
        listId,
      ) as ProductListActions<{
        productItem: ProductItem;
        listId: string;
      }>;

      const gen = sagas.updateProductItemAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      const ajustedProductItem = injectProductListExtraData(mockProductItem);

      expect(gen.next(ajustedProductItem).value).toEqual(
        call(sagaLocal.updateProductItem, ajustedProductItem, listId),
      );

      expect(gen.next([mockProductList]).value).toEqual(
        put(productListActions.setProductLists([mockProductList])),
      );

      expect(gen.next().value).toEqual(call(navigationService.goBack));

      expect(gen.next().value).toEqual(
        call(sagaServer.updateProductItem, ajustedProductItem, listId),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });

    test('ao chamar updateProductItemAsync com erro deve setar o erro corretamente', () => {
      const listId = '123456';

      const mockProductItem = new ProductItemBuilderMock()
        .withName('Lista')
        .build();

      const action = productListActions.updateProductItemAsync(
        mockProductItem,
        listId,
      ) as ProductListActions<{
        productItem: ProductItem;
        listId: string;
      }>;

      const gen = sagas.updateProductItemAsync(action);

      expect(gen.next().value).toEqual(put(productListActions.setError()));
      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(true)),
      );

      const ajustedProductItem = injectProductListExtraData(mockProductItem);

      expect(gen.next(ajustedProductItem).value).toEqual(
        call(sagaLocal.updateProductItem, ajustedProductItem, listId),
      );

      const error = new Error('error');
      expect(gen.throw(error).value).toEqual(
        put(productListActions.setError(error.message)),
      );

      expect(gen.next().value).toEqual(
        put(productListActions.setLoading(false)),
      );
      expect(gen.next().done).toBe(true);
    });
  });
});

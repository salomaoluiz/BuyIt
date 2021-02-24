import { put, call } from 'redux-saga/effects';

import navigationService from '@navigator/services/navigationService';

import { productListActions } from '../';
import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import * as sagas from '../sagas';
import * as sagaLocal from '../sagas-local';
import * as sagaServer from '../sagas-server';
import { ProductListAction, ProductList, ProductItem } from '../types';
import { injectProductListExtraData } from '../utils';

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
    describe('Create List', () => {
      test('deve criar uma nova lista corretamente', () => {
        const action = productListActions.createList(
          productList,
        ) as ProductListAction<{
          productList: ProductList;
        }>;

        const gen = sagas.createList(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        const ajustedProductList = injectProductListExtraData(productList);

        expect(gen.next(ajustedProductList).value).toEqual(
          call(sagaLocal.createList, ajustedProductList),
        );

        expect(gen.next([ajustedProductList]).value).toEqual(
          put(productListActions.setProductLists([ajustedProductList])),
        );
        expect(gen.next().value).toEqual(call(navigationService.goBack));

        expect(gen.next(ajustedProductList).value).toEqual(
          call(sagaServer.createList, ajustedProductList),
        );

        expect(gen.next().done).toBe(true);
      });

      test('em caso de erro ao criar a lista, deve seta-lo corretamente', () => {
        const action = productListActions.createList(
          productList,
        ) as ProductListAction<{
          productList: ProductList;
        }>;

        const gen = sagas.createList(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        const ajustedProductList = injectProductListExtraData(productList);

        expect(gen.next(ajustedProductList).value).toEqual(
          call(sagaLocal.createList, ajustedProductList),
        );

        const error = new Error('error');
        expect(gen.throw(error).value).toEqual(
          put(productListActions.setError(error.message)),
        );

        expect(gen.next().done).toBe(true);
      });
    });

    describe('Request Lists', () => {
      test('deve realizar o request para as listas corretamente', () => {
        const gen = sagas.requestLists();

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        expect(gen.next().value).toEqual(call(sagaServer.requestLists));

        expect(gen.next([productList]).value).toEqual(
          put(productListActions.setProductLists([productList])),
        );

        expect(gen.next().done).toBe(true);
      });

      test('caso nao tenha produtos no servidor, não deve realizar alterações na lista de produtos', () => {
        const gen = sagas.requestLists();

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        expect(gen.next().value).toEqual(call(sagaServer.requestLists));

        expect(gen.next().done).toBe(true);
      });

      test('caso tenha erro ao requisitar as listas, deve seta-lo corretamente', () => {
        const gen = sagas.requestLists();

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        expect(gen.next().value).toEqual(call(sagaServer.requestLists));

        const error = new Error('error');
        expect(gen.throw(error).value).toEqual(
          put(productListActions.setError(error.message)),
        );

        expect(gen.next().done).toBe(true);
      });
    });

    describe('Update List', () => {
      test('deve atualizar a lista corretamente', () => {
        const action = productListActions.updateList(
          productList,
        ) as ProductListAction<{
          productList: ProductList;
        }>;

        const gen = sagas.updateList(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        const ajustedProductList = injectProductListExtraData(productList);

        expect(gen.next(ajustedProductList).value).toEqual(
          call(sagaLocal.updateList, ajustedProductList),
        );
        expect(gen.next([ajustedProductList]).value).toEqual(
          put(productListActions.setProductLists([ajustedProductList])),
        );
        expect(gen.next().value).toEqual(call(navigationService.goBack));

        expect(gen.next(ajustedProductList).value).toEqual(
          call(sagaServer.updateList, ajustedProductList),
        );

        expect(gen.next().done).toBe(true);
      });

      test('caso tenha erro ao atualizar a lista, deve seta-lo corretamente', () => {
        const action = productListActions.updateList(
          productList,
        ) as ProductListAction<{
          productList: ProductList;
        }>;

        const gen = sagas.updateList(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        const ajustedProductList = injectProductListExtraData(productList);

        expect(gen.next(ajustedProductList).value).toEqual(
          call(sagaLocal.updateList, ajustedProductList),
        );

        const error = new Error('error');
        expect(gen.throw(error).value).toEqual(
          put(productListActions.setError(error.message)),
        );

        expect(gen.next().done).toBe(true);
      });
    });

    describe('Delete List', () => {
      test('deve deletar uma lista com sucesso', () => {
        const listId = '123456';
        const mockProductLists = new ProductListBuilderMock()
          .withName('Lista')
          .build();

        const action = productListActions.deleteList(
          listId,
        ) as ProductListAction<{
          listId: string;
        }>;

        const gen = sagas.deleteList(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        expect(gen.next([mockProductLists]).value).toEqual(
          call(sagaLocal.deleteList, listId),
        );

        expect(gen.next([mockProductLists]).value).toEqual(
          put(productListActions.setProductLists([mockProductLists])),
        );

        expect(gen.next().value).toEqual(call(sagaServer.deleteList, listId));

        expect(gen.next().done).toBe(true);
      });

      test('em caso de erro ao deletar uma lista, deve seta-lo corretamente', () => {
        const listId = '123456';
        const action = productListActions.deleteList(
          listId,
        ) as ProductListAction<{
          listId: string;
        }>;

        const gen = sagas.deleteList(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        expect(gen.next().value).toEqual(call(sagaLocal.deleteList, listId));

        const error = new Error('error');
        expect(gen.throw(error).value).toEqual(
          put(productListActions.setError(error.message)),
        );

        expect(gen.next().done).toBe(true);
      });
    });
  });

  describe('Product Items', () => {
    describe('Create Item', () => {
      test('deve criar um item em uma lista corretamente', () => {
        const listId = '123456';
        const mockProductItem = new ProductItemBuilderMock()
          .withName('Lista')
          .build();
        const mockProductList = new ProductListBuilderMock()
          .withItems([mockProductItem])
          .build();

        const action = productListActions.createItem(
          mockProductItem,
          listId,
        ) as ProductListAction<{
          productItem: ProductItem;
          listId: string;
        }>;

        const gen = sagas.createItem(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        const ajustedProductItem = injectProductListExtraData(mockProductItem);

        expect(gen.next([ajustedProductItem]).value).toEqual(
          call(sagaLocal.createItem, ajustedProductItem, listId),
        );

        expect(gen.next(mockProductList).value).toEqual(
          call(sagaServer.updateList, mockProductList),
        );
        expect(gen.next().value).toEqual(call(navigationService.goBack));

        expect(gen.next().done).toBe(true);
      });

      test('caso tenha erro ao criar o item, deve setar o erro corretamente', () => {
        const listId = '123456';
        const mockProductItem = new ProductItemBuilderMock()
          .withName('Lista')
          .build();

        const action = productListActions.createItem(
          mockProductItem,
          listId,
        ) as ProductListAction<{
          productItem: ProductItem;
          listId: string;
        }>;

        const gen = sagas.createItem(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        const ajustedProductItem = injectProductListExtraData(mockProductItem);

        expect(gen.next(ajustedProductItem).value).toEqual(
          call(sagaLocal.createItem, ajustedProductItem, listId),
        );

        const error = new Error('error');
        expect(gen.throw(error).value).toEqual(
          put(productListActions.setError(error.message)),
        );

        expect(gen.next().done).toBe(true);
      });
    });

    describe('Delete Item', () => {
      test('deve deletar um item de uma lista com sucesso', () => {
        const listId = '123456';
        const itemId = '123456';

        const action = productListActions.deleteItem(
          listId,
          itemId,
        ) as ProductListAction<{
          listId: string;
          itemId: string;
        }>;

        const gen = sagas.deleteItem(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        expect(gen.next().value).toEqual(
          call(sagaLocal.deleteItem, listId, itemId),
        );

        const newEditedList = new ProductListBuilderMock().build();

        expect(gen.next(newEditedList).value).toEqual(
          call(sagaServer.updateList, newEditedList),
        );

        expect(gen.next().done).toBe(true);
      });

      test('caso nao consiga deletar um item de uma lista, deve setar o erro com sucesso', () => {
        const listId = '123456';
        const itemId = '123456';

        const action = productListActions.deleteItem(
          listId,
          itemId,
        ) as ProductListAction<{
          listId: string;
          itemId: string;
        }>;

        const gen = sagas.deleteItem(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        expect(gen.next().value).toEqual(
          call(sagaLocal.deleteItem, listId, itemId),
        );

        const error = new Error('error');
        expect(gen.throw(error).value).toEqual(
          put(productListActions.setError(error.message)),
        );

        expect(gen.next().done).toBe(true);
      });
    });

    describe('Update Item', () => {
      test('deve atualizar um item de uma lista com sucesso', () => {
        const listId = '123456';
        const mockProductItem = new ProductItemBuilderMock()
          .withName('Lista')
          .build();

        const action = productListActions.updateItem(
          mockProductItem,
          listId,
        ) as ProductListAction<{
          productItem: ProductItem;
          listId: string;
        }>;

        const gen = sagas.updateItem(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        const ajustedProductItem = injectProductListExtraData(mockProductItem);

        expect(gen.next(ajustedProductItem).value).toEqual(
          call(sagaLocal.updateItem, ajustedProductItem, listId),
        );

        const newEditedList = new ProductListBuilderMock()
          .withId('123456')
          .withItems([mockProductItem])
          .build();

        expect(gen.next(newEditedList).value).toEqual(
          call(sagaServer.updateList, newEditedList),
        );

        expect(gen.next().value).toEqual(call(navigationService.goBack));

        expect(gen.next().done).toBe(true);
      });

      test('caso nao consiga atualizar um item de uma lista, deve setar o erro com sucesso', () => {
        const listId = '123456';

        const mockProductItem = new ProductItemBuilderMock()
          .withName('Lista')
          .build();

        const action = productListActions.updateItem(
          mockProductItem,
          listId,
        ) as ProductListAction<{
          productItem: ProductItem;
          listId: string;
        }>;

        const gen = sagas.updateItem(action);

        expect(gen.next().value).toEqual(put(productListActions.setError()));

        const ajustedProductItem = injectProductListExtraData(mockProductItem);

        expect(gen.next(ajustedProductItem).value).toEqual(
          call(sagaLocal.updateItem, ajustedProductItem, listId),
        );

        const error = new Error('error');
        expect(gen.throw(error).value).toEqual(
          put(productListActions.setError(error.message)),
        );

        expect(gen.next().done).toBe(true);
      });
    });
  });
});

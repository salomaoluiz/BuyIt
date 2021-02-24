import { put, select } from 'redux-saga/effects';

import { productListActions, productListSelectors } from '../';
import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import * as sagaLocal from '../sagas-local';
import { ProductItem, ProductList } from '../types';

describe('ProductList Sagas Local', () => {
  describe('Product Lists', () => {
    test('deve adicionar uma lista no array de listas e retornar o novo array', () => {
      const mockCurrentProductLists = new ProductListBuilderMock()
        .withId('12345')
        .build();

      const mockNewProductList = new ProductListBuilderMock()
        .withId('2222')
        .build();

      const gen = sagaLocal.createList(mockNewProductList);

      expect(gen.next([mockCurrentProductLists]).value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const expected = [mockCurrentProductLists, mockNewProductList];

      expect(gen.next([mockCurrentProductLists]).value).toEqual(expected);
      expect(gen.next().done).toBe(true);
    });

    test('deve atualizar um elemento já existente no array de listas e retornar o array atualizado', () => {
      const mockCurrentProductListsArray = new ProductListBuilderMock()
        .withName('Current Name')
        .withId('2222')
        .build();

      const mockEditedProductList = new ProductListBuilderMock()
        .withName('New Name')
        .withId('2222')
        .build() as ProductList;

      const gen = sagaLocal.updateList(mockEditedProductList);

      expect(gen.next().value).toEqual(
        select(productListSelectors.getProductLists),
      );

      expect(gen.next([mockCurrentProductListsArray]).value).toEqual([
        mockEditedProductList,
      ]);
      expect(gen.next().done).toBe(true);
    });

    test('deve retornar uma nova lista sem o elemento referente no listId', () => {
      const mockProductList1 = new ProductListBuilderMock()
        .withId('12345')
        .build() as ProductList;
      const mockProductList2 = new ProductListBuilderMock()
        .withId('111111')
        .build() as ProductList;

      const mockProductListsArray = [mockProductList1, mockProductList2];
      const listId = '12345';

      const gen = sagaLocal.deleteList(listId);

      expect(gen.next().value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const expected = [mockProductList2];
      expect(gen.next(mockProductListsArray).value).toEqual(expected);
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Product Items', () => {
    // should recive a item and a list id, and set all lists with the item in the correctly list
    test('deve receber um item e um id de lista e setar as listas com o item na lista correta', () => {
      const mockProductItem = new ProductItemBuilderMock()
        .withId('1111')
        .build() as ProductItem;
      const mockProductListArray = new ProductListBuilderMock()
        .withId('2222')
        .build();

      const listId = '2222';
      const gen = sagaLocal.createItem(mockProductItem, listId);

      expect(gen.next([mockProductListArray]).value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const expected = new ProductListBuilderMock()
        .withId('2222')
        .withItems([mockProductItem])
        .build();

      expect(gen.next([mockProductListArray]).value).toEqual(
        put(productListActions.setProductLists([expected])),
      );

      expect(gen.next().done).toBe(true);
    });

    // should recive a items list and a list id, and set all lists with all items in the correctly list
    test('deve receber uma lista de items e um id de lista e setart as listas com todos os items na lista correta', () => {
      const mockProductItem1 = new ProductItemBuilderMock()
        .withId('1111')
        .build();
      const mockProductItem2 = new ProductItemBuilderMock()
        .withId('2222')
        .build();

      const mockItemsArray = [mockProductItem1, mockProductItem2];

      const mockProductList = new ProductListBuilderMock()
        .withId('12345')
        .build();

      const listId = '12345';

      const gen = sagaLocal.requestItems(mockItemsArray, listId);

      expect(gen.next([mockProductList]).value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const expected = new ProductListBuilderMock()
        .withId('12345')
        .withItems(mockItemsArray)
        .build();

      expect(gen.next([mockProductList]).value).toEqual([expected]);

      expect(gen.next().done).toBe(true);
    });

    // should receive an item id and a list id, and set all lists without the item that has the item id
    test('deve receber um itemId e um listId e setar as listas sem o item do id', () => {
      const mockProductItem1 = new ProductItemBuilderMock()
        .withId('1111')
        .build();
      const mockProductItem2 = new ProductItemBuilderMock()
        .withId('2222')
        .build();

      const mockProductList = new ProductListBuilderMock()
        .withId('12345')
        .withItems([mockProductItem1, mockProductItem2])
        .build();

      const listId = '12345';
      const itemId = '2222';

      const gen = sagaLocal.deleteItem(listId, itemId);

      expect(gen.next([mockProductList]).value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const newProductListsArray = new ProductListBuilderMock()
        .withId('12345')
        .withItems([mockProductItem1])
        .build();


      expect(gen.next([newProductListsArray]).value).toEqual(
        put(productListActions.setProductLists([newProductListsArray])),
      );

      expect(gen.next([newProductListsArray]).value).toEqual(newProductListsArray);

      expect(gen.next().done).toBe(true);
    });

    // should recive a productItem and a list id, and set all lists with the correctly item updated
    test('deve receber um productItem e um listId e setar as listas com o item específico atualizado', () => {
      const currentProductItem = new ProductItemBuilderMock()
        .withName('Old Name')
        .withId('1111')
        .build();
      const newProductItem = new ProductItemBuilderMock()
        .withName('New Name')
        .withId('1111')
        .build();

      const mockProductList = new ProductListBuilderMock()
        .withId('12345')
        .withItems([currentProductItem])
        .build();

      const listId = '12345';

      const gen = sagaLocal.updateItem(newProductItem, listId);

      expect(gen.next([mockProductList]).value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const newProductListsArray = new ProductListBuilderMock()
        .withId('12345')
        .withItems([newProductItem])
        .build();

      expect(gen.next([newProductListsArray]).value).toEqual(
        put(productListActions.setProductLists([newProductListsArray])),
      );
      expect(gen.next([mockProductList]).value).toEqual(newProductListsArray);

      expect(gen.next().done).toBe(true);
    });
  });
});

import { select } from 'redux-saga/effects';
import { productListSelectors } from '..';
import * as sagaLocal from '../sagas-local';
import { ProductItem, ProductList, ProductLists } from '../types';
import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';

describe('ProductList Sagas Local', () => {
  describe('Product Lists', () => {
    test('deve adicionar uma lista no array de listas e retornar o novo array', () => {
      const mockCurrentProductLists = new ProductListBuilderMock()
        .withId('12345')
        .build();

      const mockNewProductList = new ProductListBuilderMock()
        .withId('2222')
        .build();

      const gen = sagaLocal.createProductList(mockNewProductList);

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
        .build({ inArray: true }) as ProductLists;

      const mockEditedProductList = new ProductListBuilderMock()
        .withName('New Name')
        .withId('2222')
        .build() as ProductList;

      const gen = sagaLocal.updateProductList(mockEditedProductList);

      expect(gen.next().value).toEqual(
        select(productListSelectors.getProductLists),
      );

      expect(gen.next(mockCurrentProductListsArray).value).toEqual([
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

      const gen = sagaLocal.deleteProductList(listId);

      expect(gen.next().value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const expected = [mockProductList2];
      expect(gen.next(mockProductListsArray).value).toEqual(expected);
      expect(gen.next().done).toBe(true);
    });
  });

  describe('Product Items', () => {
    test('deve receber um item e um id de lista e retornar as listas com o item na lista correta', () => {
      const mockProductItem = new ProductItemBuilderMock()
        .withId('1111')
        .build() as ProductItem;
      const mockProductListArray = new ProductListBuilderMock()
        .withId('2222')
        .build({ inArray: true }) as ProductLists;

      const listId = '2222';
      const gen = sagaLocal.createProductItem(mockProductItem, listId);

      expect(gen.next(mockProductListArray).value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const expected = new ProductListBuilderMock()
        .withId('2222')
        .withItems([mockProductItem])
        .build({ inArray: true });

      expect(gen.next(mockProductListArray).value).toEqual(expected);
      expect(gen.next().done).toBe(true);
    });

    test('deve receber uma lista de items e um id de lista e retornar as listas com todos os items na lista correta', () => {
      const mockProductItem1 = new ProductItemBuilderMock()
        .withId('1111')
        .build();
      const mockProductItem2 = new ProductItemBuilderMock()
        .withId('2222')
        .build();

      const mockItemsArray = [mockProductItem1, mockProductItem2];

      const mockProductList = new ProductListBuilderMock()
        .withId('12345')
        .build({ inArray: true });

      const listId = '12345';

      const gen = sagaLocal.getProductItems(mockItemsArray, listId);

      expect(gen.next(mockProductList).value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const expected = new ProductListBuilderMock()
        .withId('12345')
        .withItems(mockItemsArray)
        .build({ inArray: true });

      expect(gen.next(mockProductList).value).toEqual(expected);

      expect(gen.next().done).toBe(true);
    });

    test('deve um itemId e um listId e retornar as listas sem o item do id', () => {
      const mockProductItem1 = new ProductItemBuilderMock()
        .withId('1111')
        .build();
      const mockProductItem2 = new ProductItemBuilderMock()
        .withId('2222')
        .build();

      const mockProductList = new ProductListBuilderMock()
        .withId('12345')
        .withItems([mockProductItem1, mockProductItem2])
        .build({ inArray: true });

      const listId = '12345';
      const itemId = '2222';

      const gen = sagaLocal.deleteProductItem(listId, itemId);

      expect(gen.next(mockProductList).value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const expected = new ProductListBuilderMock()
        .withId('12345')
        .withItems([mockProductItem1])
        .build({ inArray: true });

      expect(gen.next(mockProductList).value).toEqual(expected);

      expect(gen.next().done).toBe(true);
    });

    test('deve receber um productItem e um listId e retornar as listas com o item específico atualizado', () => {
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
        .build({ inArray: true });

      const listId = '12345';

      const gen = sagaLocal.updateProductItem(newProductItem, listId);

      expect(gen.next(mockProductList).value).toEqual(
        select(productListSelectors.getProductLists),
      );

      const expected = new ProductListBuilderMock()
        .withId('12345')
        .withItems([newProductItem])
        .build({ inArray: true });

      expect(gen.next(mockProductList).value).toEqual(expected);

      expect(gen.next().done).toBe(true);
    });
  });
});

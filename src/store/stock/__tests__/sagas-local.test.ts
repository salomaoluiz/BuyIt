import { select } from 'redux-saga/effects';

import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { ProductItem, ProductItems } from '@store/product-list/types';

import { stockSelectors } from '../';
import * as sagaLocal from '../sagas-local';

describe('Stock Sagas Local', () => {
  test('deve adicionar um novo item no array do stock e retornar o novo array', () => {
    const mockCurrentStockItems = new ProductItemBuilderMock()
      .withId('12345')
      .build();

    const mockNewStockItem = new ProductItemBuilderMock().withId('2222').build();

    const gen = sagaLocal.createItem(mockNewStockItem);

    expect(gen.next([mockCurrentStockItems]).value).toEqual(
      select(stockSelectors.getStock),
    );

    const expected = [mockCurrentStockItems, mockNewStockItem];

    expect(gen.next([mockCurrentStockItems]).value).toEqual(expected);
    expect(gen.next().done).toBe(true);
  });

  test('deve retornar a lista de items no stock local', () => {
    const mockCurrentStockItems = new ProductItemBuilderMock()
      .withId('12345')
      .build();

    const gen = sagaLocal.requestStock();

    expect(gen.next([mockCurrentStockItems]).value).toEqual(
      select(stockSelectors.getStock),
    );

    const expected = [mockCurrentStockItems];

    expect(gen.next([mockCurrentStockItems]).value).toEqual(expected);
    expect(gen.next().done).toBe(true);
  });

  test('deve atualizar um elemento já existente no array do stock e retornar o array atualizado', () => {
    const mockCurrentStockItemsArray = [
      new ProductItemBuilderMock().withName('Current Name').withId('2222').build(),
    ] as ProductItems;

    const mockEditedStockItem = new ProductItemBuilderMock()
      .withName('New Name')
      .withId('2222')
      .build() as ProductItem;

    const gen = sagaLocal.updateItem(mockEditedStockItem);

    expect(gen.next().value).toEqual(select(stockSelectors.getStock));

    expect(gen.next(mockCurrentStockItemsArray).value).toEqual([
      mockEditedStockItem,
    ]);
    expect(gen.next().done).toBe(true);
  });

  test('deve retornar uma nova lista sem o elemento referente no itemId', () => {
    const mockStockItem1 = new ProductItemBuilderMock()
      .withId('12345')
      .build() as ProductItem;
    const mockStockItem2 = new ProductItemBuilderMock()
      .withId('111111')
      .build() as ProductItem;

    const mockStockItemsArray = [mockStockItem1, mockStockItem2];
    const itemId = '12345';

    const gen = sagaLocal.deleteItem(itemId);

    expect(gen.next().value).toEqual(select(stockSelectors.getStock));

    const expected = [mockStockItem2];
    expect(gen.next(mockStockItemsArray).value).toEqual(expected);
    expect(gen.next().done).toBe(true);
  });
});

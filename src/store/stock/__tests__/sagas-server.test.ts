// @ts-nocheck
import { call, select } from 'redux-saga/effects';

import { authSelectors } from '@store/auth';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { extractObjectElement } from '@utils/filters';

import { stockModels } from '../';
import * as sagaServer from '../sagas-server';
import { appStockItemsFormater, dbStockItemFormated } from '../utils';

describe('Stock Sagas Server', () => {
  describe('createStock', () => {
    const mockNewStock = new ProductItemBuilderMock()
      .withName('Name')
      .withId('1111')
      .build();

    test('deve formatar a lista modo que o DB entenda e chamar o model para criar um novo item', () => {
      const gen = sagaServer.createStockItem(mockNewStock);

      expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
      expect(gen.next().value).toEqual(select(authSelectors.getUserId));

      const formatedStock = dbStockItemFormated(mockNewStock);

      const userId = '1234';
      expect(gen.next(userId).value).toEqual(
        call(
          stockModels.createStockItem,
          userId,
          mockNewStock.id,
          formatedStock,
        ),
      );
      expect(gen.next().done).toBe(true);
    });

    test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
      const gen = sagaServer.createStockItem(mockNewStock);

      expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

      expect(gen.next(true).done).toBe(true);
    });
  });

  describe('getStocks', () => {
    const mockNewStock = new ProductItemBuilderMock()
      .withName('Name')
      .withId('1111')
      .build();

    test('deve obter o stock do DB e retornar formado de modo que o app entenda', () => {
      const gen = sagaServer.getStockItems();

      expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
      expect(gen.next().value).toEqual(select(authSelectors.getUserId));

      const userId = '1234' as any;
      expect(gen.next(userId).value).toEqual(
        call(stockModels.getStock, userId),
      );

      const mockServerData: any = [
        {
          data: () => ({ ...mockNewStock }),
        },
      ];

      const formatedStock = appStockItemsFormater(mockServerData) as any;

      expect(gen.next(mockServerData).value).toEqual(formatedStock);
      expect(gen.next().done).toBe(true);
    });

    test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
      const gen = sagaServer.getStockItems();

      expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

      expect(gen.next(true).done).toBe(true);
    });
  });

  describe('updateStock', () => {
    const mockNewStock = new ProductItemBuilderMock()
      .withName('Name')
      .withId('1111')
      .build();

    test('deve extrair o ID enviar o restante para o DB', () => {
      const gen = sagaServer.updateStockItem(mockNewStock);

      expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
      expect(gen.next().value).toEqual(select(authSelectors.getUserId));

      const userId = '1234';
      const formatedStock = extractObjectElement(mockNewStock, ['id']);

      expect(gen.next(userId).value).toEqual(
        call(
          stockModels.updateStockItem,
          userId,
          mockNewStock.id,
          formatedStock,
        ),
      );

      expect(gen.next().done).toBe(true);
    });

    test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
      const gen = sagaServer.updateStockItem(mockNewStock);

      expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

      expect(gen.next(true).done).toBe(true);
    });
  });

  describe('deleteStock', () => {
    const itemId = '12345';
    test('deve chamar o model para deletar um item do DB', () => {
      const gen = sagaServer.deleteStockItem(itemId);

      expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
      expect(gen.next().value).toEqual(select(authSelectors.getUserId));

      const userId = '1234';
      expect(gen.next(userId).value).toEqual(
        call(stockModels.deleteStockItem, userId, itemId),
      );

      expect(gen.next().done).toBe(true);
    });

    test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
      const gen = sagaServer.deleteStockItem(itemId);

      expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

      expect(gen.next(true).done).toBe(true);
    });
  });
});

// @ts-nocheck

import { authSelectors } from '@store/auth';
import { extractObjectElement } from '@utils/filters';
import { call, select } from 'redux-saga/effects';
import { productListModels } from '..';
import * as sagaServer from '../sagas-server';
import { appProductListFormater, dbProductListFormated } from '../utils';
import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';

describe('ProductList Sagas Server', () => {
  describe('Product Lists', () => {
    describe('createProductList', () => {
      const mockNewProductList = new ProductListBuilderMock()
        .withName('Name')
        .withId('1111')
        .build();

      test('deve formatar a lista modo que o DB entenda e chamar o model para criar nova lista', () => {
        const gen = sagaServer.createProductList(mockNewProductList);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const formatedProductList = dbProductListFormated(mockNewProductList);

        const userId = '1234';
        expect(gen.next(userId).value).toEqual(
          call(
            productListModels.createProductList,
            userId,
            mockNewProductList.id,
            formatedProductList,
          ),
        );
        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.createProductList(mockNewProductList);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });

    describe('getProductLists', () => {
      const mockNewProductList = new ProductListBuilderMock()
        .withName('Name')
        .withId('1111')
        .build();

      test('deve obter as listas do DB e retornar elas formadas de modo que o app entenda', () => {
        const gen = sagaServer.getProductLists();

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const userId = '1234' as any;
        expect(gen.next(userId).value).toEqual(
          call(productListModels.getProductLists, userId),
        );

        const mockServerData: any = [
          {
            data: () => ({ ...mockNewProductList }),
          },
        ];

        const formatedProductList = appProductListFormater(
          mockServerData,
        ) as any;

        expect(gen.next(mockServerData).value).toEqual(formatedProductList);
        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.getProductLists();

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });

    describe('updateProductList', () => {
      const mockNewProductList = new ProductListBuilderMock()
        .withName('Name')
        .withId('1111')
        .build();

      test('deve extrair o ID e os items da lista e enviar o restante para o DB', () => {
        const gen = sagaServer.updateProductList(mockNewProductList);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const userId = '1234';
        const formatedProductList = extractObjectElement(mockNewProductList, [
          'id',
          'items',
        ]);

        expect(gen.next(userId).value).toEqual(
          call(
            productListModels.updateProductList,
            userId,
            mockNewProductList.id,
            formatedProductList,
          ),
        );

        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.updateProductList(mockNewProductList);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });

    describe('deleteProductList', () => {
      const listId = '12345';
      test('deve chamar o model para deletar um item do DB', () => {
        const gen = sagaServer.deleteProductList(listId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const userId = '1234';
        expect(gen.next(userId).value).toEqual(
          call(productListModels.deleteProductList, userId, listId),
        );

        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.deleteProductList(listId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });
  });

  describe('Product Items', () => {
    describe('createProductItem', () => {
      const mockProductItem = new ProductItemBuilderMock()
        .withName('name')
        .withId('1234')
        .build();
      const listId = '12345';

      test('deve extrair o id do item e criar um novo item no DB', () => {
        const gen = sagaServer.createProductItem(mockProductItem, listId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const filteredProductItem = extractObjectElement(mockProductItem, [
          'id',
        ]);
        const userId = '1234' as any;
        expect(gen.next(userId).value).toEqual(
          call(
            productListModels.createProductItem,
            userId,
            listId,
            mockProductItem.id,
            filteredProductItem,
          ),
        );

        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.createProductItem(mockProductItem, listId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });

    describe('getProductItem', () => {
      const mockProductItem = new ProductItemBuilderMock()
        .withName('name')
        .withId('1234')
        .build();
      const listId = '12345';

      test('deve obter do DB a lista de items e retornar formatado de modo que o app entenda', () => {
        const gen = sagaServer.getProductItems(listId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const userId = '1234' as any;
        expect(gen.next(userId).value).toEqual(
          call(productListModels.getProductItems, userId, listId),
        );

        const mockServerData: any = [
          {
            data: () => ({ ...mockProductItem }),
          },
        ];

        const formatedList = appProductListFormater(mockServerData);

        expect(gen.next(mockServerData).value).toEqual(formatedList);
        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.getProductItems(listId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });

    describe('updateProductItem', () => {
      const mockProductItem = new ProductItemBuilderMock()
        .withName('name')
        .withId('1234')
        .build();
      const listId = '12345';
      test('deve extrair o id do item e atualizar o item no DB', () => {
        const gen = sagaServer.updateProductItem(mockProductItem, listId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const formatedProductItem = extractObjectElement(mockProductItem, [
          'id',
        ]);

        const userId = '1234' as any;
        expect(gen.next(userId).value).toEqual(
          call(
            productListModels.updateProductItem,
            userId,
            listId,
            mockProductItem.id,
            formatedProductItem,
          ),
        );

        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.updateProductItem(mockProductItem, listId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });

    describe('deleteProductItem', () => {
      const listId = '12345';
      const itemId = '12345';

      test('deve deletar o item do DB', () => {
        const gen = sagaServer.deleteProductItem(listId, itemId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const userId = '1234' as any;
        expect(gen.next(userId).value).toEqual(
          call(productListModels.deleteProductItem, userId, listId, itemId),
        );

        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.deleteProductItem(listId, itemId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });
  });
});

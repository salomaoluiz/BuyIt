// @ts-nocheck
import { call, select } from 'redux-saga/effects';

import { authSelectors } from '@store/auth';
import { extractObjectElement } from '@utils/filters';

import { productListModels } from '../';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import * as sagaServer from '../sagas-server';
import { appProductListFormater, dbProductListFormated } from '../utils';

describe('ProductList Sagas Server', () => {
  describe('Product Lists', () => {
    describe('createList', () => {
      const mockNewProductList = new ProductListBuilderMock()
        .withName('Name')
        .withId('1111')
        .build();

      test('deve formatar a lista modo que o DB entenda e chamar o model para criar nova lista', () => {
        const gen = sagaServer.createList(mockNewProductList);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const formatedProductList = dbProductListFormated(mockNewProductList);

        const userId = '1234';
        expect(gen.next(userId).value).toEqual(
          call(
            productListModels.createList,
            userId,
            mockNewProductList.id,
            formatedProductList,
          ),
        );
        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.createList(mockNewProductList);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });

    describe('requestLists', () => {
      const mockNewProductList = new ProductListBuilderMock()
        .withName('Name')
        .withId('1111')
        .build();

      test('deve obter as listas do DB e retornar elas formadas de modo que o app entenda', () => {
        const gen = sagaServer.requestLists();

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const userId = '1234' as any;
        expect(gen.next(userId).value).toEqual(
          call(productListModels.requestLists, userId),
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
        const gen = sagaServer.requestLists();

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });

    describe('updateList', () => {
      const mockNewProductList = new ProductListBuilderMock()
        .withName('Name')
        .withId('1111')
        .build();

      test('deve extrair o ID da lista e enviar o restante para o DB', () => {
        const gen = sagaServer.updateList(mockNewProductList);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const userId = '1234';
        const formatedProductList = extractObjectElement(mockNewProductList, [
          'id'
        ]);

        expect(gen.next(userId).value).toEqual(
          call(
            productListModels.updateList,
            userId,
            mockNewProductList.id,
            formatedProductList,
          ),
        );

        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.updateList(mockNewProductList);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });

    describe('deleteList', () => {
      const listId = '12345';
      test('deve chamar o model para deletar um item do DB', () => {
        const gen = sagaServer.deleteList(listId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));
        expect(gen.next().value).toEqual(select(authSelectors.getUserId));

        const userId = '1234';
        expect(gen.next(userId).value).toEqual(
          call(productListModels.deleteList, userId, listId),
        );

        expect(gen.next().done).toBe(true);
      });

      test('caso esteja anonimo, nao deve prosseguir com a saga', () => {
        const gen = sagaServer.deleteList(listId);

        expect(gen.next().value).toEqual(select(authSelectors.isAnonymously));

        expect(gen.next(true).done).toBe(true);
      });
    });
  });
});

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
    test('deve chamar o model createProductList com os parâmetros corretos', () => {
      const mockNewProductList = new ProductListBuilderMock()
        .withName('Name')
        .withId('1111')
        .build();

      const gen = sagaServer.createProductList(mockNewProductList);

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
    });

    test('deve chamar o model getProductLists com os parâmetros corretos', () => {
      const mockNewProductList = new ProductListBuilderMock()
        .withName('Name')
        .withId('1111')
        .build();

      const gen = sagaServer.getProductLists();

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

      const formatedProductList = appProductListFormater(mockServerData) as any;

      expect(gen.next(mockServerData).value).toEqual(formatedProductList);
      expect(gen.next().done).toBe(true);
    });

    test('deve chamar o model updateProductList com os parâmetros corretos', () => {
      const mockNewProductList = new ProductListBuilderMock()
        .withName('Name')
        .withId('1111')
        .build();

      const gen = sagaServer.updateProductList(mockNewProductList);

      expect(gen.next().value).toEqual(select(authSelectors.getUserId));

      const userId = '1234' as any;
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

    test('deve chamar o model deleteProductList com os parâmetros corretos', () => {
      const listId = '12345';

      const gen = sagaServer.deleteProductList(listId);

      expect(gen.next().value).toEqual(select(authSelectors.getUserId));

      const userId = '1234' as any;

      expect(gen.next(userId).value).toEqual(
        call(productListModels.deleteProductList, userId, listId),
      );

      expect(gen.next().done).toBe(true);
    });
  });

  describe('Product Items', () => {
    test('deve chamar o model createProductItem com os parâmetros corretos', () => {
      const mockProductItem = new ProductItemBuilderMock()
        .withName('name')
        .withId('1234')
        .build();

      const listId = '12345';

      const gen = sagaServer.createProductItem(mockProductItem, listId);

      expect(gen.next().value).toEqual(select(authSelectors.getUserId));

      const filteredProductItem = extractObjectElement(mockProductItem, ['id']);
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

    test('deve chamar o model getProductItems com os parâmetros corretos', () => {
      const mockProductItem = new ProductItemBuilderMock()
        .withName('name')
        .withId('1234')
        .build();
      const listId = '12345';

      const gen = sagaServer.getProductItems(listId);

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

    test('deve chamar o model updateProductItem com os parâmetros corretos', () => {
      const mockProductItem = new ProductItemBuilderMock()
        .withName('name')
        .withId('1234')
        .build();
      const listId = '12345';

      const gen = sagaServer.updateProductItem(mockProductItem, listId);

      expect(gen.next().value).toEqual(select(authSelectors.getUserId));

      const formatedProductItem = extractObjectElement(mockProductItem, ['id']);

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

    test('deve chamar o model deleteProductItem com os parâmetros corretos', () => {
      const listId = '12345';
      const itemId = '12345';

      const gen = sagaServer.deleteProductItem(listId, itemId);

      expect(gen.next().value).toEqual(select(authSelectors.getUserId));

      const userId = '1234' as any;
      expect(gen.next(userId).value).toEqual(
        call(productListModels.deleteProductItem, userId, listId, itemId),
      );

      expect(gen.next().done).toBe(true);
    });
  });
});

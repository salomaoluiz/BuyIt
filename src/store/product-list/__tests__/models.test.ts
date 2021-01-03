import * as firestore from '@react-native-firebase/firestore';

import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import * as models from '../models';

describe('ProductLists Models', () => {
  const docSet = jest.fn();
  const docUpdate = jest.fn();
  const docDelete = jest.fn();
  const docGet = jest.fn();
  const collectionGet = jest.fn();
  const collectionSpy = jest.fn();
  const collectionDoc = jest.fn();

  jest.spyOn<any, any>(firestore, 'default').mockReturnValue({
    collection: collectionSpy.mockReturnValue({
      doc: collectionDoc.mockReturnValue({
        set: docSet,
        update: docUpdate,
        delete: docDelete,
        get: docGet,
      }),
      get: collectionGet,
    }),
  });

  const userId = '12345';
  describe('Product Lists', () => {
    test('ao chamar getProductLists deve chamar o get da collection', async () => {
      await models.getProductLists(userId);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists`,
      );
      expect(collectionGet).toHaveBeenCalled();
    });

    test('ao chamar createProductList deve chamar o set do doc', async () => {
      const mockProductList = new ProductListBuilderMock()
        .withId('1234')
        .build();
      const listId = '1234';
      await models.createProductList(userId, listId, mockProductList);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(listId);
      expect(docSet).toHaveBeenCalledWith({ ...mockProductList });
    });

    test('ao chamar findProductList deve chamar o get do doc', async () => {
      const listId = '1234';
      await models.findProductList(userId, listId);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(listId);
      expect(docGet).toHaveBeenCalled();
    });

    test('ao chamar updateProductList deve chamar o update do doc', async () => {
      const mockProductList = new ProductListBuilderMock().build();
      const listId = '1234';
      await models.updateProductList(userId, listId, mockProductList);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(listId);
      expect(docUpdate).toHaveBeenCalledWith({ ...mockProductList });
    });

    test('ao chamar deleteProductList deve chamar o delete do doc', async () => {
      const listId = '1234';
      await models.deleteProductList(userId, listId);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(listId);
      expect(docDelete).toHaveBeenCalled();
    });
  });

  describe('Product Items', () => {
    test('ao chamar getProductItems deve chamar o get da collection', async () => {
      const listId = '1234';
      await models.getProductItems(userId, listId);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists/${listId}/items`,
      );
      expect(collectionGet).toHaveBeenCalled();
    });

    test('ao chamar createProductItem deve chamar o set do doc', async () => {
      const mockProductItem = new ProductItemBuilderMock()
        .withId('1234')
        .build();

      const listId = '1234';
      const itemId = '1234';

      await models.createProductItem(userId, listId, itemId, mockProductItem);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists/${listId}/items`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(itemId);
      expect(docSet).toHaveBeenCalledWith({ ...mockProductItem });
    });

    test('ao chamar findProductItem deve chamar o get do doc', async () => {
      const listId = '1234';
      const itemId = '1234';

      await models.findProductItem(userId, listId, itemId);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists/${listId}/items`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(itemId);
      expect(docGet).toHaveBeenCalled();
    });

    test('ao chamar updateProductItem deve chamar o update do doc', async () => {
      const mockProductItem = new ProductItemBuilderMock()
        .withId('1234')
        .build();
      const listId = '1234';
      const itemId = '1234';

      await models.updateProductItem(userId, listId, itemId, mockProductItem);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists/${listId}/items`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(itemId);
      expect(docUpdate).toHaveBeenCalledWith({ ...mockProductItem });
    });

    test('ao chamar deleteProductItem deve chamar o delete do doc', async () => {
      const listId = '1234';
      const itemId = '1234';

      await models.deleteProductItem(userId, listId, itemId);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists/${listId}/items`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(itemId);
      expect(docDelete).toHaveBeenCalled();
    });
  });
});

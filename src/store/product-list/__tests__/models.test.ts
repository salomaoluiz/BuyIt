import * as firestore from '@react-native-firebase/firestore';

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
    test('ao chamar requestLists deve chamar o get da collection', async () => {
      await models.requestLists(userId);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists`,
      );
      expect(collectionGet).toHaveBeenCalled();
    });

    test('ao chamar createList deve chamar o set do doc', async () => {
      const mockProductList = new ProductListBuilderMock()
        .withId('1234')
        .build();
      const listId = '1234';
      await models.createList(userId, listId, mockProductList);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(listId);
      expect(docSet).toHaveBeenCalledWith({ ...mockProductList });
    });

    test('ao chamar findList deve chamar o get do doc', async () => {
      const listId = '1234';
      await models.findList(userId, listId);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(listId);
      expect(docGet).toHaveBeenCalled();
    });

    test('ao chamar updateList deve chamar o update do doc', async () => {
      const mockProductList = new ProductListBuilderMock().build();
      const listId = '1234';
      await models.updateList(userId, listId, mockProductList);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(listId);
      expect(docUpdate).toHaveBeenCalledWith({ ...mockProductList });
    });

    test('ao chamar deleteList deve chamar o delete do doc', async () => {
      const listId = '1234';
      await models.deleteList(userId, listId);

      expect(collectionSpy).toHaveBeenCalledWith(
        `users/${userId}/productLists`,
      );
      expect(collectionDoc).toHaveBeenCalledWith(listId);
      expect(docDelete).toHaveBeenCalled();
    });
  });

});

import * as firestore from '@react-native-firebase/firestore';

import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';

import * as models from '../models';

describe('StockItems Models', () => {
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
    test('ao chamar getStockItems deve chamar o get da collection', async () => {
      await models.requestStock(userId);

      expect(collectionSpy).toHaveBeenCalledWith(`users/${userId}/stock`);
      expect(collectionGet).toHaveBeenCalled();
    });

    test('ao chamar createStockItem deve chamar o set do doc', async () => {
      const mockStockItem = new ProductItemBuilderMock().build();
      await models.createItem(userId, mockStockItem.id, mockStockItem);

      expect(collectionSpy).toHaveBeenCalledWith(`users/${userId}/stock`);
      expect(docSet).toHaveBeenCalledWith({ ...mockStockItem });
    });

    test('ao chamar findStockItem deve chamar o get do doc', async () => {
      const mockStockItem = new ProductItemBuilderMock().build();

      await models.findItem(userId, mockStockItem.id);

      expect(collectionSpy).toHaveBeenCalledWith(`users/${userId}/stock`);
      expect(docGet).toHaveBeenCalled();
    });

    test('ao chamar updateStockItem deve chamar o update do doc', async () => {
      const mockStockItem = new ProductItemBuilderMock().build();
      await models.updateItem(userId, mockStockItem.id, mockStockItem);

      expect(collectionSpy).toHaveBeenCalledWith(`users/${userId}/stock`);
      expect(docUpdate).toHaveBeenCalledWith({ ...mockStockItem });
    });

    test('ao chamar deleteStockItem deve chamar o delete do doc', async () => {
      const mockStockItem = new ProductItemBuilderMock().build();
      await models.deleteItem(userId, mockStockItem.id);

      expect(collectionSpy).toHaveBeenCalledWith(`users/${userId}/stock`);
      expect(docDelete).toHaveBeenCalled();
    });
  });
});

import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';

import { stockActions } from '../';
import { StockTypes } from '../types';

describe('Stock Actions', () => {
  const mockError = new Error('teste');
  const mockData = new ProductItemBuilderMock()
    .withId('12345')
    .withAmount('11')
    .withBrand('BR')
    .withName('Name')
    .withQtd('1')
    .withUnit({ id: 'UN', title: 'Unidade' })
    .build();

  //#region actions

  const setError = [
    'setError',
    stockActions.setError(mockError.message),
    { type: StockTypes.SET_ERROR, payload: { error: 'teste' } },
  ];

  const requestStock = [
    'requestStock',
    stockActions.requestStock(),
    { type: StockTypes.REQUEST_STOCK },
  ];

  const createItem = [
    'createItem',
    stockActions.createItem(mockData),
    { type: StockTypes.CREATE_ITEM, payload: { stockItem: mockData } },
  ];

  const updateItem = [
    'updateItem',
    stockActions.updateItem(mockData),
    { type: StockTypes.UPDATE_ITEM, payload: { stockItem: mockData } },
  ];

  const deleteItem = [
    'deleteItem',
    stockActions.deleteItem('12345'),
    { type: StockTypes.DELETE_ITEM, payload: { itemId: '12345' } },
  ];

  const setStock = [
    'setStock',
    stockActions.setStock([mockData]),
    { type: StockTypes.SET_STOCK, payload: { stock: [mockData] } },
  ];

  //#endregion

  test.each([
    setError,
    requestStock,
    createItem,
    updateItem,
    deleteItem,
    setStock,
  ])(
    'deve retornar corretamente para a action %s',
    (describe, action, expected) => {
      expect(action).toEqual(expected);
    },
  );
});

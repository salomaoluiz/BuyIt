import { ProductItemBuilderMock } from '../__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '../__mocks__/productListBuilder.mock';
import actions from '../actions';
import { ProductListTypes } from '../types';

describe('ProductList Actions', () => {
  const mockList = new ProductListBuilderMock().withName('Lista').build();
  const mockItem = new ProductItemBuilderMock().withName('Lista').build();

  //#region Actions

  const setError = [
    'setError',
    actions.setError('error'),
    { type: ProductListTypes.SET_ERROR, payload: { error: 'error' } },
  ];

  const requestLists = [
    'requestLists',
    actions.requestLists(),
    { type: ProductListTypes.REQUEST_LISTS },
  ];

  const createList = [
    'createList',
    actions.createList(mockList),
    { type: ProductListTypes.CREATE_LIST, payload: { productList: mockList } },
  ];

  const updateList = [
    'updateList',
    actions.updateList(mockList),
    { type: ProductListTypes.UPDATE_LIST, payload: { productList: mockList } },
  ];

  const deleteList = [
    'deleteList',
    actions.deleteList('12345'),
    { type: ProductListTypes.DELETE_LIST, payload: { listId: '12345' } },
  ];

  const setProductLists = [
    'setProductLists',
    actions.setProductLists([mockList]),
    {
      type: ProductListTypes.SET_PRODUCT_LISTS,
      payload: { productLists: [mockList] },
    },
  ];

  const createItem = [
    'createItem',
    actions.createItem(mockItem, '12345'),
    {
      type: ProductListTypes.CREATE_ITEM,
      payload: { productItem: mockItem, listId: '12345' },
    },
  ];

  const deleteItem = [
    'deleteItem',
    actions.deleteItem('111', '12345'),
    {
      type: ProductListTypes.DELETE_ITEM,
      payload: { itemId: '111', listId: '12345' },
    },
  ];

  const updateItem = [
    'updateItem',
    actions.updateItem(mockItem, '12345'),
    {
      type: ProductListTypes.UPDATE_ITEM,
      payload: { productItem: mockItem, listId: '12345' },
    },
  ];

  //#endregion

  test.each([
    setError,
    requestLists,
    createList,
    updateList,
    deleteList,
    setProductLists,
    createItem,
    deleteItem,
    updateItem,
  ])('deve retornar corretamente a action %s', (describe, action, expected) => {
    expect(action).toEqual(expected);
  });
});

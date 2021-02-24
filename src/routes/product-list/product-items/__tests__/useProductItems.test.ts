import * as navigation from '@react-navigation/native';
import { renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { productListActions } from '@store/product-list';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '@store/product-list/__mocks__/productListBuilder.mock';

import useProductItems from '../useProductItems';

jest.mock('@react-navigation/native');

const mockProductItem1 = new ProductItemBuilderMock()
  .withName('Item 1')
  .withId('123456')
  .withUpdatedAt(1111)
  .build();

const mockProductItem2 = new ProductItemBuilderMock()
  .withName('Item 1')
  .withId('123456')
  .withUpdatedAt(2222)
  .build();

const mockProductItem3 = new ProductItemBuilderMock()
  .withName('Item 1')
  .withId('123456')
  .withUpdatedAt(3333)
  .build();

const mockProductItem = [mockProductItem1, mockProductItem3, mockProductItem2];
const mockProductList = new ProductListBuilderMock()
  .withName('Lista 1')
  .withId('123456')
  .withItems(mockProductItem)
  .build();

const dispatch = jest.fn();
describe('ProductItems - useProductItems', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue([mockProductList]);
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest.spyOn(navigation, 'useRoute').mockReturnValue({
      key: '1',
      name: 'ProductItems',
      params: { listId: '123456' },
    });
  });

  test('ao iniciar deve obter a lista de items ordenada', () => {
    const { result } = renderHook(useProductItems);

    const expectedOrdenedList = [
      mockProductItem3,
      mockProductItem2,
      mockProductItem1,
    ];

    expect(result.current.listId).toEqual('123456');
    expect(result.current.listName).toEqual('Lista 1');
    expect(result.current.ordenedList).toEqual(expectedOrdenedList);
  });

  test('ao iniciar deve disparar a action getProductItemsAsync', () => {
    renderHook(useProductItems);

    expect(dispatch).toHaveBeenCalledWith(
      productListActions.requestLists(),
    );
  });
});

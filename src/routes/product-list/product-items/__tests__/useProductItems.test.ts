import * as reactRedux from 'react-redux';
import * as navigation from '@react-navigation/native';

import { ProductListBuilderMock } from '@store/product-list/__mocks__/productListBuilder.mock';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { renderHook } from '@testing-library/react-hooks';

import useProductItems from '../useProductItems';
import { productListActions } from '@store/product-list';

jest.mock('@react-navigation/native');

const mockProductItem = new ProductItemBuilderMock()
  .withName('Item 1')
  .withId('123456')
  .build();

const mockProductList = new ProductListBuilderMock()
  .withName('Lista 1')
  .withId('123456')
  .withItems([mockProductItem])
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

  test('ao iniciar deve obter a lista de items', () => {
    const { result } = renderHook(useProductItems);

    expect(result.current.listId).toEqual('123456');
    expect(result.current.productItems).toEqual([mockProductItem]);
    expect(result.current.listName).toEqual('Lista 1');
  });

  test('ao iniciar deve disparar a action getProductItemsAsync', () => {
    renderHook(useProductItems);

    expect(dispatch).toHaveBeenCalledWith(
      productListActions.getProductItemsAsync('123456'),
    );
  });
});

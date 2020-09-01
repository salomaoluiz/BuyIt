import * as reactRedux from 'react-redux';
import * as navigation from '@react-navigation/native';

import { ProductListBuilderMock } from '@store/product-list/__mocks__/productListBuilderMock';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilderMock';
import { renderHook } from '@testing-library/react-hooks';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';

import useProductItems from '../useProductItems';

jest.mock('@react-navigation/native');
const setOptions = jest.fn();

const mockProductItem = new ProductItemBuilderMock()
  .withName('Item 1')
  .withId('123456')
  .build();

const mockProductList = new ProductListBuilderMock()
  .withName('Lista 1')
  .withId('123456')
  .withItems([mockProductItem])
  .build();

describe('ProductItems - useProductItems', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue([mockProductList]);
    jest.spyOn(navigation, 'useRoute').mockReturnValue({
      key: '1',
      name: 'ProductItems',
      params: { listId: '123456' },
    });
    jest.spyOn(navigation, 'useNavigation').mockReturnValue({
      ...useNavigationMocks,
      setOptions,
    });
  });

  test('ao iniciar deve obter a lista de items', () => {
    const { result } = renderHook(useProductItems);

    expect(result.current.listId).toEqual('123456');
    expect(result.current.productItems).toEqual([mockProductItem]);
    expect(result.current.listName).toEqual('Lista 1');
  });

  test('ao iniciar deve setar o headerTitle para o nome da lista', () => {
    renderHook(useProductItems);

    expect(setOptions).toHaveBeenCalledWith({ title: 'Lista 1' });
  });
});

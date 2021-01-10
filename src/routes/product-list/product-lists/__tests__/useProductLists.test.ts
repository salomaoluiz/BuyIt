import * as navigation from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { Routes } from '@routes';
import { productListActions } from '@store/product-list';
import { ProductListBuilderMock } from '@store/product-list/__mocks__/productListBuilder.mock';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';

import useProductLists from '../useProductLists';

jest.mock('@react-navigation/native');
describe('ProductList - useProductLists', () => {
  const navigate = jest.fn();
  jest
    .spyOn(navigation, 'useNavigation')
    .mockReturnValue({ ...useNavigationMocks, navigate });
  const dispatch = jest.fn();
  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);

  const mockProductList1 = new ProductListBuilderMock()
    .withId('1')
    .withUpdatedAt(1111)
    .build();
  const mockProductList2 = new ProductListBuilderMock()
    .withId('2')
    .withUpdatedAt(2222)
    .build();

  const mockProductList = [mockProductList1, mockProductList2];
  jest.spyOn(reactRedux, 'useSelector').mockReturnValue(mockProductList);

  test('ao inicializar deve realizar um fetch nas listas', () => {
    renderHook(useProductLists);

    expect(dispatch).toHaveBeenCalledWith(
      productListActions.requestLists(),
    );
  });

  test('ao inicializar ordenar as listas e retornar elas ordenadas', () => {
    const { result } = renderHook(useProductLists);

    const expectedProductList = [mockProductList2, mockProductList1];

    expect(result.current.ordenedList).toEqual(expectedProductList);
  });

  test('ao pressionar o botão de nova lista deve navegar para a tela de nova lista', () => {
    const { result } = renderHook(useProductLists);

    act(() => {
      result.current.onNewButtonPress();
    });

    expect(navigate).toHaveBeenCalledWith(Routes.NewList, {});
  });
});

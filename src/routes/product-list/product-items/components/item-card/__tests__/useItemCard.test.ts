import * as navigation from '@react-navigation/native';
import { renderHook, act } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { Routes } from '@routes';
import { productListActions } from '@store/product-list';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';

import useItemCard from '../useItemCard';

jest.mock('@react-navigation/native');

const dispatch = jest.fn();
const navigate = jest.fn();

const mockProductItem = new ProductItemBuilderMock()
  .withId('654321')
  .withName('Produto 1')
  .build();

describe('ProductItems - Components - ItemCard - useItemCard', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest
      .spyOn(navigation, 'useNavigation')
      .mockReturnValue({ ...useNavigationMocks, navigate });
  });

  test('ao chamar handleEditItem é preciso navegar para a NewListItem passando os parametros corretos', () => {
    const initialProps = {
      productItem: mockProductItem,
      listId: '123456',
      itemIndex: 1,
    };
    const { result } = renderHook(useItemCard, { initialProps });

    act(() => {
      result.current.handleEditItem();
    });

    expect(navigate).toHaveBeenCalledWith(Routes.NewListItem, {
      productItem: mockProductItem,
      action: productListActions,
      listId: '123456',
    });
  });

  test('ao chamar handleDeleteItem é preciso chamar a action deleteProductItemAsync com os parâmetros corretos', () => {
    const initialProps = {
      productItem: mockProductItem,
      action: productListActions,
      listId: '123456',
      itemIndex: 1,
    };
    const { result } = renderHook(useItemCard, { initialProps });

    act(() => {
      result.current.handleDeleteItem();
    });

    const itemId = '654321';
    const listId = '123456';
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.deleteItem(itemId, listId),
    );
  });
});

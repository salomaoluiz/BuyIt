import * as reactRedux from 'react-redux';
import { Alert } from 'react-native';
import * as navigation from '@react-navigation/native';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';
import { renderHook, act } from '@testing-library/react-hooks';
import useItemCard from './useItemCard';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { Routes } from '@routes';
import { productListActions } from '@store/product-list';
import * as strings from '@locales/product-list';

jest.mock('@react-navigation/native');

const dispatch = jest.fn();
const navigate = jest.fn();
let alert: jest.SpyInstance;

const mockProductItem = new ProductItemBuilderMock()
  .withId('654321')
  .withName('Produto 1')
  .build();

describe('ProductItems - Components - ItemCard - useItemCard', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    alert = jest.spyOn(Alert, 'alert');
    jest
      .spyOn(navigation, 'useNavigation')
      .mockReturnValue({ ...useNavigationMocks, navigate });
  });

  test('ao chamar _handleEditItem é preciso navegar para a NewListItem passando os parametros corretos', () => {
    const initialProps = {
      productItem: mockProductItem,
      listId: '123456',
      itemIndex: 1,
    };
    const { result } = renderHook(useItemCard, { initialProps });

    act(() => {
      result.current._handleEditItem();
    });

    expect(navigate).toHaveBeenCalledWith(Routes.NewListItem, {
      productItem: mockProductItem,
      listId: '123456',
    });
  });

  test('ao chamar _handleDeleteItem é preciso chamar a action deleteProductItemAsync com os parâmetros corretos', () => {
    const initialProps = {
      productItem: mockProductItem,
      listId: '123456',
      itemIndex: 1,
    };
    const { result } = renderHook(useItemCard, { initialProps });

    act(() => {
      result.current._handleDeleteItem();
    });

    const itemId = '654321';
    const listId = '123456';
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.deleteProductItemAsync(itemId, listId),
    );
  });

  test('ao chamar handleItemPress é preciso chamar um Action com as opções para editar e deletar', () => {
    const initialProps = {
      productItem: mockProductItem,
      listId: '123456',
      itemIndex: 1,
    };
    const { result } = renderHook(useItemCard, { initialProps });

    act(() => {
      result.current.handleItemPress();
    });

    expect(alert).toHaveBeenCalledWith(
      strings.whatWant,
      strings.whatWantDo,
      [
        { text: strings.editItem, onPress: result.current._handleEditItem },
        { text: strings.deleteItem, onPress: result.current._handleDeleteItem },
      ],
    );
  });
});

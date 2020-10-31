import * as navigation from '@react-navigation/native';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';
import useItemCard from '../useItemCard';
jest.mock('@react-navigation/native');
import * as reactRedux from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import { Routes } from '@routes';
import { stockActions } from '@store/stock';
import { Alert } from 'react-native';
import appLocale from '@locales';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';

const dispatch = jest.fn();
const strings = appLocale();

describe('useItemCard', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest.spyOn(navigation, 'useNavigation').mockReturnValue(useNavigationMocks);
    jest.spyOn(Alert, 'alert');
  });

  test('ao chamar _handleEditItem deve navegar para a tela de NewListItem com os parâmetros corretos', () => {
    const initialProps = {
      item: new ProductItemBuilderMock().build(),
      index: 1,
    };

    const { result } = renderHook(useItemCard, { initialProps });

    act(() => {
      result.current._handleEditItem();
    });

    expect(useNavigationMocks.navigate).toHaveBeenCalledWith(
      Routes.NewListItem,
      {
        productItem: initialProps.item,
        action: stockActions,
      },
    );
  });

  test('ao chamar _handleDeleteItem deve disparar a action para apagar o item', () => {
    const initialProps = {
      item: new ProductItemBuilderMock().build(),
      index: 1,
    };

    const { result } = renderHook(useItemCard, { initialProps });

    act(() => {
      result.current._handleDeleteItem();
    });

    expect(dispatch).toHaveBeenCalledWith(
      stockActions.deleteProductItemAsync(initialProps.item.id),
    );
  });

  test('ao chamar handleItemPress deve mostrar uma action com os textos e botões para apagar e editar', () => {
    const initialProps = {
      item: new ProductItemBuilderMock().build(),
      index: 1,
    };

    const { result } = renderHook(useItemCard, { initialProps });

    act(() => {
      result.current.handleItemPress();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      strings.general.whatWant,
      strings.general.whatWantDo,
      [
        {
          text: strings.general.editItem,
          onPress: result.current._handleEditItem,
        },
        {
          text: strings.general.deleteItem,
          onPress: result.current._handleDeleteItem,
        },
      ],
    );
  });
});

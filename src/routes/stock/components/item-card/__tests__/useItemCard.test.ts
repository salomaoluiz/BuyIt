import * as navigation from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-hooks';
import { Alert } from 'react-native';
import * as reactRedux from 'react-redux';

import { Routes } from '@routes';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { stockActions } from '@store/stock';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';

import useItemCard from '../useItemCard';

const dispatch = jest.fn();

jest.mock('@react-navigation/native');
describe('useItemCard', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest.spyOn(navigation, 'useNavigation').mockReturnValue(useNavigationMocks);
    jest.spyOn(Alert, 'alert');
  });

  // when handleEditItem is called, should navigate to NewListItem screen with the correctly params
  test('ao chamar handleEditItem deve navegar para a tela de NewListItem com os parâmetros corretos', () => {
    const initialProps = {
      item: new ProductItemBuilderMock().build(),
      index: 1,
    };

    const { result } = renderHook(useItemCard, { initialProps });

    act(() => {
      result.current.handleEditItem();
    });

    expect(useNavigationMocks.navigate).toHaveBeenCalledWith(
      Routes.NewListItem,
      {
        productItem: initialProps.item,
        action: stockActions,
      },
    );
  });

  // when handleDeleteItem is called, should dispatch the action to delete the item
  test('ao chamar handleDeleteItem deve disparar a action para apagar o item', () => {
    const initialProps = {
      item: new ProductItemBuilderMock().build(),
      index: 1,
    };

    const { result } = renderHook(useItemCard, { initialProps });

    act(() => {
      result.current.handleDeleteItem();
    });

    expect(dispatch).toHaveBeenCalledWith(
      stockActions.deleteItem(initialProps.item.id),
    );
  });
});

import * as navigation from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-hooks';
import { Alert } from 'react-native';
import * as reactRedux from 'react-redux';

import { translate } from '@locales';
import { Routes } from '@routes';
import { productListActions } from '@store/product-list';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { ProductListBuilderMock } from '@store/product-list/__mocks__/productListBuilder.mock';
import { ProductList } from '@store/product-list/types';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';

import useListCard from '../useListCard';

jest.mock('@react-navigation/native');
describe('ProductList - useListCard', () => {
  const navigate = jest.fn();
  jest
    .spyOn(navigation, 'useNavigation')
    .mockReturnValue({ ...useNavigationMocks, navigate });

  const dispatch = jest.fn();
  jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
  const alertSpy = jest
    .spyOn(Alert, 'alert')
    .mockImplementation((value) => value);
  const mockProductList: ProductList = new ProductListBuilderMock()
    .withId('12345')
    .withItems([new ProductItemBuilderMock().build()])
    .build();

  test('ao inicializar deve setar a quantidade de itens', () => {
    const initialProps = {
      productList: mockProductList,
    };
    const { result } = renderHook(useListCard, { initialProps });

    expect(result.current.totalItems).toEqual(1);
  });

  test('ao pressionar em um item da lista, deve navegar para a tela dos items', () => {
    const initialProps = {
      productList: mockProductList,
    };
    const { result } = renderHook(useListCard, { initialProps });

    act(() => {
      result.current.onListPress();
    });

    expect(navigate).toHaveBeenCalledWith(Routes.ProductItems, {
      listId: '12345',
    });
  });

  test('ao pressionar de forma longa o item deve aparecer um alerta com opções para editar e deletar o item', () => {
    const initialProps = {
      productList: mockProductList,
    };
    const { result } = renderHook(useListCard, { initialProps });

    act(() => {
      result.current.handleListLongPress();
    });
    expect(alertSpy).toHaveBeenCalledWith(
      translate('general.whatWant'),
      translate('general.whatWantDo'),
      [
        {
          text: translate('general.edit'),
          onPress: result.current._handleEditItem,
        },
        {
          text: translate('general.delete'),
          onPress: result.current._handleDeleteItem,
        },
      ],
    );
  });

  test('ao chamar a funcao de editar o item, deve navegar para a tela de novo item passando os parametros', () => {
    const initialProps = {
      productList: mockProductList,
    };
    const { result } = renderHook(useListCard, { initialProps });

    act(() => {
      result.current._handleEditItem();
    });

    expect(navigate).toHaveBeenCalledWith(Routes.NewList, {
      productList: mockProductList,
    });
  });

  test('ao chamar a funcao de deletar o item, deve disparar a action de deletar lista', () => {
    const initialProps = {
      productList: mockProductList,
    };
    const { result } = renderHook(useListCard, { initialProps });

    act(() => {
      result.current._handleDeleteItem();
    });

    expect(dispatch).toHaveBeenCalledWith(
      productListActions.deleteList(mockProductList.id),
    );
  });
});

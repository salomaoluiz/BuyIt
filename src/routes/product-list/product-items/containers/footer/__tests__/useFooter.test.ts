import * as navigation from '@react-navigation/native';
import { renderHook, act } from '@testing-library/react-hooks';

import { Routes } from '@routes';
import { productListActions } from '@store/product-list';
import { ProductItemBuilderMock } from '@store/product-list/__mocks__/productItemBuilder.mock';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';

import useFooter from '../useFooter';

const mockProductItem = new ProductItemBuilderMock()
  .withName('Produto 1')
  .withAmount('1.4')
  .withQtd('2')
  .build();
const mockProductItem2 = new ProductItemBuilderMock()
  .withName('Produto 2')
  .withAmount('2.3')
  .withQtd('5')
  .build();

jest.mock('@react-navigation/native');

const navigate = jest.fn();
describe('ProductItems - Containers - Footer - useFooter', () => {
  beforeAll(() => {
    jest
      .spyOn(navigation, 'useNavigation')
      .mockReturnValue({ ...useNavigationMocks, navigate });
  });

  test('ao iniciar, deve calcular o subtotal dos itens', () => {
    const initialProps = {
      productItems: [mockProductItem, mockProductItem2],
      listId: '123456',
    };

    const { result } = renderHook(useFooter, { initialProps });

    expect(result.current.amountTotal).toEqual(3.70);
    expect(result.current.qtdTotal).toEqual('7');
  });

  test('ao chamar onAddButtonPress deve navegar para a NewListItem com os parametros corretos', () => {
    const initialProps = {
      productItems: [mockProductItem, mockProductItem2],
      listId: '123456',
    };

    const { result } = renderHook(useFooter, { initialProps });

    act(() => {
      result.current.onAddButtonPress();
    });

    expect(navigate).toHaveBeenCalledWith(Routes.NewListItem, {
      listId: '123456',
      action: productListActions,
    });
  });
});

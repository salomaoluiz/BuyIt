import { renderHook } from '@testing-library/react-hooks';
import useProductList from '../useProductList';
import * as reactRedux from 'react-redux';
import { Routes } from '@routes';
import { Alert } from 'react-native';
import { productListActions } from '@store/product-list';
import { ProductListState } from '@store/product-list/types';

describe('Testando useProductList', () => {
  let getItemData: jest.SpyInstance;
  let navigate: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let initialProps: any;
  const productListStateMocked: ProductListState = {
    productList: [
      { id: '1', brand: '', name: 'name', amount: '1.5', qtd: '13', unit: 'g' },
      { id: '2', brand: '', name: 'name2', amount: '2.5', qtd: '2', unit: 'g' },
    ],
  };
  let alert: jest.SpyInstance;
  let dispatch: jest.Mock;
  beforeEach(() => {
    dispatch = jest.fn();

    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    getItemData = jest
      .spyOn(reactRedux, 'useSelector')
      .mockReturnValue(productListStateMocked);
    navigate = jest.fn();
    initialProps = { navigation: { navigate }, route: {} };
    alert = jest.spyOn(Alert, 'alert');
  });

  it('deve ao iniciar chamar o reducer e setar retornar a lista de itens', () => {
    const { result } = renderHook(useProductList, { initialProps });

    expect(getItemData).toBeCalled();
    expect(result.current.productList).toEqual(
      productListStateMocked.productList,
    );
  });

  it('deve ao iniciar calcular corretamente o valor total e quantidade total', () => {
    const { result } = renderHook(useProductList, { initialProps });

    expect(result.current.amountTotal).toEqual(4);
    expect(result.current.qtdTotal).toEqual(15);
  });

  it('deve retornar o navigate corretamente ao pressionar o botão', () => {
    const { result } = renderHook(useProductList, { initialProps });

    result.current.onAddButtonPress();

    expect(navigate).toBeCalledWith(Routes.NewProduct, {});
  });

  it('deve clicar no item, aparecer o Alert e clicar em Editar, para navegar para o new-product', () => {
    const { result } = renderHook(useProductList, { initialProps });

    result.current.onItemPress('1');

    expect(alert).toHaveBeenCalled();
    const editButton = alert.mock.calls[0][2][0].onPress;

    editButton();
    expect(navigate).toHaveBeenLastCalledWith('NewProduct', {
      productItem: {
        id: '1',
        brand: '',
        name: 'name',
        amount: '1.5',
        qtd: '13',
        unit: 'g',
      },
    });
  });

  it('deve clicar no item, aparecer o Alert e clicar em Deletar deve apagar o item', () => {
    const { result } = renderHook(useProductList, { initialProps });

    result.current.onItemPress('1');

    expect(alert).toHaveBeenCalled();
    const deleteButton = alert.mock.calls[0][2][1].onPress;

    const newItemsDataMocked = [
      {
        id: '2',
        brand: '',
        name: 'name2',
        unit: 'g',
        amount: '2.5',
        qtd: '2',
      },
    ];
    const action = productListActions.setProductList(newItemsDataMocked);
    deleteButton();
    expect(dispatch).toHaveBeenLastCalledWith(action);
  });
});

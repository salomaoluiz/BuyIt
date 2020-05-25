import { renderHook } from '@testing-library/react-hooks';
import useProductList from '../useProductList';
import * as reactRedux from 'react-redux';
import { Routes } from '@routes';

describe('Testando useProductList', () => {
  let getItemData: jest.SpyInstance;
  let navigate: jest.Mock;
  let initialProps: any;
  const itemDataMocked = [
    { key: '1', name: 'name', amount: '1.5', qtd: '13' },
    { key: '2', name: 'name2', amount: '2.5', qtd: '2' },
  ];

  beforeEach(() => {
    getItemData = jest
      .spyOn(reactRedux, 'useSelector')
      .mockReturnValue(itemDataMocked);
    navigate = jest.fn();
    initialProps = { navigation: { navigate } };
  });

  it('deve ao iniciar chamar o reducer e setar retornar a lista de itens', () => {
    const { result } = renderHook(useProductList, { initialProps });

    expect(getItemData).toBeCalled();
    expect(result.current.itemsData).toEqual(itemDataMocked);
  });

  it('deve ao iniciar calcular corretamente o valor total e quantidade total', () => {
    const { result } = renderHook(useProductList, { initialProps });

    expect(result.current.amountTotal).toEqual(4);
    expect(result.current.qtdTotal).toEqual(15);
  });

  it('deve retornar o navigate corretamente ao pressionar o botão', () => {
    const { result } = renderHook(useProductList, { initialProps });

    result.current.onAddButtonPress();

    expect(navigate).toBeCalledWith(Routes.NewProduct);
  });
});

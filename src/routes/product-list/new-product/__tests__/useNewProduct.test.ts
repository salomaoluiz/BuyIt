import * as reactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import * as id from '@utils/id';

import useNewProduct from '../useNewProduct';
import { setItemsData } from '../../store/actions';
import { productListErrors } from 'src/errors/forms/__mocks__/product-list';
import { ItemsDataArray } from '@routes/product-list/store/types';

// #region Settings

let getItemData: jest.SpyInstance;
let dispatch: jest.Mock;

let goBack: jest.Mock;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let initialProps: any;

const itemDataMocked: ItemsDataArray = [
  {
    id: '1',
    brand: 'marca',
    name: 'name',
    amount: '1.5',
    qtd: '13',
    unit: 'un',
  },
  {
    id: '2',
    brand: 'marca',
    name: 'name2',
    amount: '2.5',
    qtd: '2',
    unit: 'Kg',
  },
];

// #endregion

describe('Testando useNewProduct', () => {
  beforeEach(() => {
    dispatch = jest.fn();
    goBack = jest.fn();

    getItemData = jest
      .spyOn(reactRedux, 'useSelector')
      .mockReturnValue(itemDataMocked);

    jest.spyOn(id, 'generateUniqueID').mockReturnValue('3');
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    initialProps = { navigation: { goBack }, route: { params: undefined } };
  });

  it('deve ao iniciar chamar o reducer e setar retornar a lista de itens', () => {
    renderHook(useNewProduct, { initialProps });

    expect(getItemData).toBeCalled();
  });

  it('deve ao iniciar com valores default caso chegue pelo navigation', () => {
    const newInitialProps = {
      ...initialProps,
      route: {
        params: {
          itemData: {
            id: '123',
            brand: 'marca',
            name: 'Teste',
            amount: '69',
            qtd: '555',
            unit: 'Kg',
          },
        },
      },
    };

    const { result } = renderHook(useNewProduct, {
      initialProps: newInitialProps,
    });

    expect(result.current.name).toEqual('Teste');
    expect(result.current.amount).toEqual('69');
    expect(result.current.qtd).toEqual('555');
  });

  it('deve resultar em erro caso o nome nao esteja preenchido', async () => {
    const { result } = renderHook(useNewProduct, {
      initialProps,
    });

    await act(() => result.current.onSaveButtonPress());

    expect(result.current.errorItems).toEqual(
      productListErrors.resultErrorRequired,
    );
  });

  it('deve resultar em erro caso o preço seja um valor e qtd inválido', async () => {
    const { result } = renderHook(useNewProduct, { initialProps });

    act(() => result.current.setName('oi'));
    act(() => result.current.setQtd('12;'));
    act(() => result.current.setAmount('12-='));
    await act(() => result.current.onSaveButtonPress());

    expect(result.current.errorItems).toEqual(
      productListErrors.resultErrorInvalid,
    );
  });

  it('deve gravar tudo corretamente se todos os valores estiverem preenchidos', async () => {
    const { result } = renderHook(useNewProduct, { initialProps });

    const itemMock = {
      name: 'Teste',
      brand: 'marca',
      amount: '10',
      id: '3',
      qtd: '10',
      unit: 'un',
    };

    act(() => result.current.setName(itemMock.name));
    act(() => result.current.setAmount(itemMock.amount));
    act(() => result.current.setBrand(itemMock.brand));
    act(() => result.current.setQtd(itemMock.qtd));
    act(() => result.current.setUnit(itemMock.unit));

    await act(() => result.current.onSaveButtonPress());

    const newItemsList = itemDataMocked.concat([itemMock]);
    const action = setItemsData(newItemsList);

    expect(dispatch).toHaveBeenLastCalledWith(action);
    expect(goBack).toHaveBeenCalled();
  });
});

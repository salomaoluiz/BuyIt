import * as reactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import * as errors from '@utils/handleErrors';
import errorsString from '@locales/general-errors';
import * as id from '@utils/id';

import useNewProduct from '../useNewProduct';
import { setItemsData } from '../../store/actions';

// #region Settings

let getItemData: jest.SpyInstance;
let dispatch: jest.Mock;
let useErrorMessage: jest.SpyInstance;
let goBack: jest.Mock;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let initialProps: any;

const itemDataMocked = [
	{ id: '1', name: 'name', amount: '1.5', qtd: '13' },
	{ id: '2', name: 'name2', amount: '2.5', qtd: '2' },
];

// #endregion

describe('Testando useNewProduct', () => {
	beforeEach(() => {
		dispatch = jest.fn();
		goBack = jest.fn();
		useErrorMessage = jest.spyOn(errors, 'useErrorMessage');
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
					itemData: { id: '123', name: 'Teste', amount: '69', qtd: '555' },
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

	it('deve resultar em erro caso o nome nao esteja preenchido', () => {
		const { result } = renderHook(useNewProduct, {
			initialProps,
		});

		result.current.onSaveButtonPress();
		expect(useErrorMessage).toHaveBeenLastCalledWith(
			errorsString.error,
			errorsString.productList.insertValidName,
		);
	});

	it('deve resultar em erro caso o preço seja um valor inválido', () => {
		const { result } = renderHook(useNewProduct, { initialProps });

		act(() => result.current.setName('oi'));
		result.current.onSaveButtonPress();

		expect(useErrorMessage).toHaveBeenLastCalledWith(
			errorsString.error,
			errorsString.productList.insertValidAmount,
		);
	});

	it('deve gravar tudo corretamente se todos os valores estiverem preenchidos e o qtd for default', () => {
		const { result } = renderHook(useNewProduct, { initialProps });

		const itemMock = { name: 'Teste', amount: '10', id: '3', qtd: '1' };
		act(() => result.current.setName(itemMock.name));
		act(() => result.current.setAmount(itemMock.amount));

		result.current.onSaveButtonPress();

		const newItemsList = itemDataMocked.concat([itemMock]);
		const action = setItemsData(newItemsList);

		expect(dispatch).toHaveBeenLastCalledWith(action);
		expect(goBack).toHaveBeenCalled();
	});

	it('deve gravar tudo corretamente se todos os valores estiverem preenchidos', () => {
		const { result } = renderHook(useNewProduct, { initialProps });

		const itemMock = { name: 'Teste', amount: '10', id: '3', qtd: '10' };
		act(() => result.current.setName(itemMock.name));
		act(() => result.current.setAmount(itemMock.amount));
		act(() => result.current.setQtd(itemMock.qtd));

		result.current.onSaveButtonPress();

		const newItemsList = itemDataMocked.concat([itemMock]);
		const action = setItemsData(newItemsList);

		expect(dispatch).toHaveBeenLastCalledWith(action);
		expect(goBack).toHaveBeenCalled();
	});
});

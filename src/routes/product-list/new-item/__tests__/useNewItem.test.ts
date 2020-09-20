import * as reactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import useNewItem from '../useNewItem';
import { productListActions } from '@store/product-list';
import useHeader from '@navigator/components/header/useHeader';

jest.mock('@navigator/components/header/useHeader', () => jest.fn());

const dispatch = jest.fn();
describe('NewItem - useNewItem', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue(true);
  });
  const checkForm = jest.fn().mockResolvedValue(true);

  const initialProps = {
    formParams: {
      id: undefined,
      name: '',
      amount: '',
      qtd: '',
      unit: 'un',
      brand: '',
    },
    checkForm,
    listId: '123456',
  };

  test('ao inicializar, deve chamar o useHeader ativando o header', () => {
    renderHook(useNewItem, { initialProps });

    expect(useHeader).toHaveBeenCalledWith({ showHeader: true });
  });

  test('ao chamar onSaveButtonPress sem um id deve chamar o checkForm e disparar a action createProductItemAsync', async () => {
    const { result } = renderHook(useNewItem, { initialProps });

    await act(async () => {
      await result.current.onSaveButtonPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.createProductItemAsync(
        initialProps.formParams,
        initialProps.listId,
      ),
    );
  });

  test('ao chamar onSaveButtonPress com um id deve chamar o checkForm e disparar a action updateProductItemAsync', async () => {
    const newInitialProps = {
      ...initialProps,
      formParams: {
        ...initialProps.formParams,
        id: '123456',
      },
    };
    const { result } = renderHook(useNewItem, {
      initialProps: newInitialProps,
    });

    await act(async () => {
      await result.current.onSaveButtonPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.updateProductItemAsync(
        newInitialProps.formParams,
        initialProps.listId,
      ),
    );
  });
});

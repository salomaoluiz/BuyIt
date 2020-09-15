import * as reactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import useNewItem from '../useNewItem';
import { productListActions } from '@store/product-list';

const dispatch = jest.fn();
describe('NewItem - useNewItem', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue(true);
  });

  test('ao chamar onSaveButtonPress sem um id deve chamar o checkForm e disparar a action createProductItemAsync', async () => {
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
});

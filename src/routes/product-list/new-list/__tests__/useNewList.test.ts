import * as reactRedux from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import useNewList from '../useNewList';
import { productListActions } from '@store/product-list';

const dispatch = jest.fn();
describe('NewList - useNewList', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue(true);
  });

  test('ao chamar onAddPress deve chamar o checkForm e disparar a action setProductListAsync', async () => {
    const checkForm = jest.fn().mockResolvedValue(true);
    const initialProps = {
      listParams: {
        id: undefined,
        name: '',
        items: [],
      },
      checkForm,
    };

    const { result } = renderHook(useNewList, { initialProps });

    await act(async () => {
      await result.current.onAddPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.setProductListAsync(initialProps.listParams),
    );
  });
});

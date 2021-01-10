import { renderHook, act } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { productListActions } from '@store/product-list';
import * as admob from 'src/firebase/admob';

import useNewList from '../useNewList';

const dispatch = jest.fn();
const showAd = jest.fn();
describe('NewList - useNewList', () => {
  beforeAll(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue(true);
    jest.spyOn(admob, 'useInterstitialAd').mockReturnValue({ showAd });
  });
  const checkForm = jest.fn().mockResolvedValue(true);
  const initialProps = {
    listParams: {
      id: undefined,
      name: '',
      items: [],
    },
    checkForm,
  };

  test('ao chamar onAddPress sem id deve chamar o checkForm e disparar a action createProductListAsync', async () => {
    const { result } = renderHook(useNewList, { initialProps });

    await act(async () => {
      await result.current.onAddPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.createList(initialProps.listParams),
    );
    expect(showAd).toHaveBeenCalled();
  });

  test('ao chamar onAddPress com um id deve chamar o checkForm e disparar a action updateProductListAsync', async () => {
    const newInitialProps = {
      ...initialProps,
      listParams: {
        ...initialProps.listParams,
        id: '123456',
      },
    };
    const { result } = renderHook(useNewList, {
      initialProps: newInitialProps,
    });

    await act(async () => {
      await result.current.onAddPress();
    });

    expect(checkForm).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      productListActions.updateList(newInitialProps.listParams),
    );
    expect(showAd).not.toHaveBeenCalled();
  });
});

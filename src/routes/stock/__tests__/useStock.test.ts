import * as navigation from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-hooks';
import * as reactRedux from 'react-redux';

import { Routes } from '@routes';
import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder.mock';
import { stockActions, stockSelectors } from '@store/stock';
import { useNavigationMocks } from 'src/__tests__/navigation-mocks';

import useStock from '../useStock';

jest.mock('@react-navigation/native');

const dispatch = jest.fn();
describe('useStock', () => {
  beforeAll(() => {
    jest.spyOn(navigation, 'useNavigation').mockReturnValue(useNavigationMocks);
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
    jest.spyOn(reactRedux, 'useSelector').mockImplementation((func) => {
      if (func === stockSelectors.isLoading) return false;
      return new AppStateMockBuilder()
        .withStock({ isLoading: false, stock: [] })
        .build();
    });
  });

  test('ao inicializar deve fazer um fetch para o stockData', () => {
    renderHook(useStock);

    expect(dispatch).toHaveBeenCalledWith(stockActions.requestStock());
  });

  test('ao pressionar o botao de add deve navegar para a tela de novo item com os parâmetros corretos', () => {
    const { result } = renderHook(useStock);

    act(() => {
      result.current.handleAddButtonPress();
    });

    expect(useNavigationMocks.navigate).toHaveBeenCalledWith(
      Routes.NewListItem,
      { action: stockActions },
    );
  });
});

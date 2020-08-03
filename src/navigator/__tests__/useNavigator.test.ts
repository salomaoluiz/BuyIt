import * as reactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import useNavigator from '@navigator/useNavigator';
import { authSelectors } from '@store/auth';
import { generalSelector } from '@store/general';
import { mockReducerInitialState } from 'src/__tests__/mocks';

jest
  .spyOn(authSelectors, 'getState')
  .mockReturnValueOnce(mockReducerInitialState.authReducer)
  .mockReturnValueOnce({
    ...mockReducerInitialState.authReducer,
    isLoggedIn: true,
  });
jest
  .spyOn(generalSelector, 'getPersistState')
  .mockReturnValueOnce(mockReducerInitialState._persist)
  .mockReturnValueOnce({
    ...mockReducerInitialState._persist,
    rehydrated: true,
  });

describe('Testando o Rehydrate', () => {
  const useSelectorMock = jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((props) => props({}));

  test('deve atualizar o rehydrate e o isAuthenticated', async () => {
    const { result, rerender } = renderHook(useNavigator);
    expect(result.current.isRehydrated).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);

    useSelectorMock
      .mockReturnValueOnce({ isLoggedIn: true })
      .mockReturnValueOnce({ rehydrated: true });

    rerender();
    expect(result.current.isRehydrated).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
  });
});

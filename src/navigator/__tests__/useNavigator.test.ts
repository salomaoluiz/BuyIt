import * as reactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import useNavigator from '@navigator/useNavigator';
import { authSelectors } from '@store/auth';
import { generalSelector } from '@store/general';
import { AppStateMockBuilder } from '@store/__mocks__/AppStateMockBuilder.mock';

const mockState = new AppStateMockBuilder();
jest
  .spyOn(authSelectors, 'getState')
  .mockReturnValueOnce(mockState.authReducer)
  .mockReturnValueOnce({
    ...mockState.authReducer,
    isLoggedIn: true,
  });
jest
  .spyOn(generalSelector, 'getPersistState')
  .mockReturnValueOnce(mockState._persist)
  .mockReturnValueOnce({
    ...mockState._persist,
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

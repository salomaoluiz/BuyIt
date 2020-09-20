import * as reactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import useNavigator from '@navigator/useNavigator';
import { authSelectors } from '@store/auth';
import { generalSelector } from '@store/general';

describe('Testando o Rehydrate', () => {
  const useSelectorMock = jest
    .spyOn(reactRedux, 'useSelector')
    .mockImplementation((props) => {
      if (props === generalSelector.getPersistState)
        return { rehydrated: false };
      return false;
    });

  test('deve atualizar o rehydrate e o isAuthenticated', async () => {
    const { result, rerender } = renderHook(useNavigator);
    expect(result.current.isRehydrated).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);

    useSelectorMock.mockImplementation((props) => {
      if (props === generalSelector.getPersistState)
        return { rehydrated: true };
      if (props === authSelectors.isLogged) return true;
    });

    rerender();
    expect(result.current.isRehydrated).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
  });
});

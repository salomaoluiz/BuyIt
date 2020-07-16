import * as reactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import useNavigator from '@navigator/useNavigator';

jest.useFakeTimers();
describe('Testando o Rehydrate', () => {
  const useSelectorMock = jest
    .spyOn(reactRedux, 'useSelector')
    .mockReturnValue({ rehydrated: false });

  test('deve atualizar o rehydrate', async () => {
    const { result, rerender } = renderHook(useNavigator);
    expect(result.current.isRehydrated).toBe(false);

    useSelectorMock.mockReturnValue({ rehydrated: true });
    rerender();
    expect(result.current.isRehydrated).toBe(true);
  });
});

import { renderHook } from '@testing-library/react-hooks';
import useMenuModal from '../useMenuModal';

describe('testando o useMenuModal', () => {
  it('deve obter pelo props a posição e retornar formatado a posição do componente', () => {
    const initialProps = {
      position: {
        pageX: 30,
        pageY: 200,
      },
    };
    const { result } = renderHook(useMenuModal, { initialProps });

    expect(result.current.cordsXY).toEqual({ X: 30, Y: 150 });
  });
});

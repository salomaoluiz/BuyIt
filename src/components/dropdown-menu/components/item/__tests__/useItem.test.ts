import { renderHook } from '@testing-library/react-hooks';
import useItem from '../useItem';

describe('testando o useItem', () => {
  it('deve tratar o item selecionado retornando as informações', () => {
    const { result } = renderHook(useItem);
    const mockList = [
      { id: 'un', value: 'Unidade' },
      { id: 'ml', value: 'Mililitro' },
      { id: 'L', value: 'Litro' },
      { id: 'g', value: 'Gramas' },
      { id: 'Kg', value: 'Kilogramas' },
      { id: 'cx', value: 'Caixa' },
      { id: 'emb', value: 'Embalagem' },
      { id: 'lata', value: 'Lata' },
      { id: 'galão', value: 'Galão' },
    ];

    const mockItem = { id: 'un', value: 'Unidade' };

    const resultItem = result.current.handleSelectedItem(
      mockItem,
      mockList,
      'galão',
    );

    expect(resultItem.isFirst).toBe(true);
    expect(resultItem.isLast).toBe(false);
    expect(resultItem.isSelected).toBe(false);
  });
});

import appLocale, { appCurrency } from '@locales';
import stringsPTBR from '../ptBR';

describe('Locale - useLocale', () => {
  test('deve retornar a string correta', () => {
    const result = appLocale();

    expect(result).toEqual(stringsPTBR);
  });

  test('deve retornar a currency correta', () => {
    const result = appCurrency();

    expect(result.currency).toEqual('R$');
  });
});

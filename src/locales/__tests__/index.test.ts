import i18n from 'i18n-js';

import appLocale, {
  appCurrency,
  getAvailableLocales,
  getLanguage,
  init,
  setLanguage,
  toCurrency,
  translate,
  translateInLocale,
} from '@locales';

import * as persist from '../persist';
import stringsPTBR from '../ptBR';
import * as utils from '../utils';

jest.mock('../persist');
jest.mock('../utils');
jest.mock('i18n-js');

describe('Locales', () => {
  const spyGetLocale = jest.spyOn(persist, 'getLocale');
  const spySaveLocale = jest.spyOn(persist, 'saveLocale');
  const spyHasTranslationAvailable = jest.spyOn(
    utils,
    'hasTranslationAvailable',
  );

  const spyToCurrency = jest.spyOn(i18n, 'toCurrency');

  afterEach(() => {
    jest.clearAllMocks();
  });

  // should return the correctly string
  test('deve retornar a string correta', () => {
    const result = appLocale();

    expect(result).toEqual(stringsPTBR);
  });

  // should return the correctly currency
  test('deve retornar a currency correta', () => {
    const result = appCurrency();

    expect(result).toEqual('R$');
  });

  // if don't has the locale in AsyncStorage, should set default value ptBR
  test('caso não possua o locale no AsyncStorage, deve setar o default ptBR', async () => {
    spyGetLocale.mockResolvedValue(null);

    await init();

    expect(spyGetLocale).toHaveBeenCalled();
    expect(i18n.locale).toEqual('ptBR');
  });

  // if has the locale in AsyncStorage, should set it
  test('caso possua o locale no AsyncStorage, deve seta-lo', async () => {
    spyGetLocale.mockResolvedValue('enUS');

    await init();

    expect(spyGetLocale).toHaveBeenCalled();
    expect(i18n.locale).toEqual('enUS');
  });

  // should translate in a specífic language
  test('deve traduzir em um idioma específico', () => {
    const tSpy = jest.spyOn(i18n, 't');

    translateInLocale('teste', 'ptBR');

    expect(tSpy).toHaveBeenCalledWith('teste', { locale: 'ptBR' });
  });

  // should set the correctly language
  test('deve definir o idioma correto', async () => {
    spyHasTranslationAvailable.mockReturnValue(true);

    await setLanguage('enUS');

    expect(i18n.locale).toEqual('enUS');
    expect(spySaveLocale).toHaveBeenCalledWith('enUS');
  });

  // if the language are not available, should throw a error
  test('caso o idioma nao esteja disponível, deve estourar um erro', async () => {
    spyHasTranslationAvailable.mockReturnValue(false);
    try {
      // @ts-ignore
      await setLanguage('frEU');
    } catch (err) {
      expect(err).toEqual(new Error('Unavailable language'));
    }
  });

  // should return the selected language
  test('deve retornar o idioma selecionado', async () => {
    expect(i18n.locale).toEqual('enUS');
    spyHasTranslationAvailable.mockReturnValue(true);
    await setLanguage('ptBR');

    const locale = getLanguage();
    expect(locale).toEqual('ptBR');
  });

  // should return the available locales
  test('deve retornar as traduções disponíveis', () => {
    const availableLocales = getAvailableLocales();

    expect(availableLocales).toEqual(['ptBR', 'enUS']);
  });

  // should convert a number to a currency
  test('deve converter um número para o currency', () => {
    toCurrency(125.15);

    expect(spyToCurrency).toHaveBeenCalledWith(125.15, {
      unit: translate('general.currency'),
    });
  });
});

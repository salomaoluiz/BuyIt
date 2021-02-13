import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import {
  getAvailableLocales,
  getLanguage,
  initLocale,
  setLanguage,
  toCurrency,
  translate,
  translateInLocale,
} from '@locales';

import * as persist from '../persist';
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

  // if don't has the locale in AsyncStorage, should set default value from 'react-native-localize'
  test('caso não possua o locale no AsyncStorage, deve setar o default de react-native-localize', async () => {
    spyGetLocale.mockResolvedValue(null);
    const spyFindBestAvailableLanguage = jest
      .spyOn(RNLocalize, 'findBestAvailableLanguage')
      .mockImplementation(() => ({
        languageTag: 'en-US',
        isRTL: false,
      }));

    await initLocale();

    expect(spyGetLocale).toHaveBeenCalled();
    expect(spyFindBestAvailableLanguage).toHaveBeenCalledWith(
      getAvailableLocales(),
    );
    expect(i18n.locale).toEqual('en-US');

    spyFindBestAvailableLanguage.mockRestore();
  });

  // if don't has the locale in AsyncStorage, and system locale is not supported, should set it to 'pt-BR'
  test('caso não possua o locale no AsyncStorage e o locale não é suportado pelo sistema, deve configurá-lo como pt-BR', async () => {
    spyGetLocale.mockResolvedValue(null);
    const spyFindBestAvailableLanguage = jest
      .spyOn(RNLocalize, 'findBestAvailableLanguage')
      .mockImplementation(() => undefined);

    await initLocale();

    expect(spyGetLocale).toHaveBeenCalled();
    expect(spyFindBestAvailableLanguage).toHaveBeenCalledWith(
      getAvailableLocales(),
    );
    expect(i18n.locale).toEqual('pt-BR');

    spyFindBestAvailableLanguage.mockRestore();
  });

  // if has the locale in AsyncStorage, should set it
  test('caso possua o locale no AsyncStorage, deve seta-lo', async () => {
    spyGetLocale.mockResolvedValue('en-US');

    await initLocale();

    expect(spyGetLocale).toHaveBeenCalled();
    expect(i18n.locale).toEqual('en-US');
  });

  // should translate in a specífic language
  test('deve traduzir em um idioma específico', () => {
    const tSpy = jest.spyOn(i18n, 't');

    translateInLocale('teste', 'pt-BR');

    expect(tSpy).toHaveBeenCalledWith('teste', { locale: 'pt-BR' });
  });

  // should set the correctly language
  test('deve definir o idioma correto', async () => {
    spyHasTranslationAvailable.mockReturnValue(true);

    await setLanguage('en-US');

    expect(i18n.locale).toEqual('en-US');
    expect(spySaveLocale).toHaveBeenCalledWith('en-US');
  });

  // if the language are not available, should throw a error
  test('caso o idioma nao esteja disponível, deve estourar um erro', async () => {
    spyHasTranslationAvailable.mockReturnValue(false);
    try {
      // @ts-ignore
      await setLanguage('fr-EU');
    } catch (err) {
      expect(err).toEqual(new Error('Unavailable language'));
    }
  });

  // should return the selected language
  test('deve retornar o idioma selecionado', async () => {
    expect(i18n.locale).toEqual('en-US');
    spyHasTranslationAvailable.mockReturnValue(true);
    await setLanguage('pt-BR');

    const locale = getLanguage();
    expect(locale).toEqual('pt-BR');
  });

  // should return the available locales
  test('deve retornar as traduções disponíveis', () => {
    const availableLocales = getAvailableLocales();

    expect(availableLocales).toEqual(['pt-BR', 'en-US']);
  });

  // should convert a number to a currency
  test('deve converter um número para o currency', () => {
    toCurrency(125.15);

    expect(spyToCurrency).toHaveBeenCalledWith(125.15, {
      unit: translate('general.currency'),
    });
  });
});

import { act, renderHook } from '@testing-library/react-hooks';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';

import * as locales from '@locales';
import enUS from '@locales/enUS';

import useLocales from '../useLocales';

jest.mock('@locales');

describe('Settings - useLocales', () => {
  const spyRestart = jest.spyOn(RNRestart, 'Restart');
  const spyAlert = jest.spyOn(Alert, 'alert');
  const spySetLanguage = jest.spyOn(locales, 'setLanguage');
  jest.spyOn(locales, 'getAvailableLocales').mockReturnValue(['en-US', 'pt-BR']);
  jest.spyOn(locales, 'getLanguage').mockReturnValue('en-US');
  jest
    .spyOn(locales, 'translateInLocale')
    .mockImplementation((path, language) => {
      if (language === 'en-US') return 'English';
      if (language === 'pt-BR') return 'Português';

      return '';
    });
  jest.spyOn(locales, 'translate').mockImplementation((path) => {
    if (path === 'settings.restartTheApp') return enUS.settings.restartTheApp;
    if (path === 'settings.willRestartNow') return enUS.settings.willRestartNow;
    if (path === 'general.yes') return enUS.general.yes;
    if (path === 'general.no') return enUS.general.no;
    return '';
  });

  // on start, should set the available languages and the selected language
  test('ao inicializar deve setar os idiomas disponíveis e o idioma selecionado', () => {
    const { result } = renderHook(useLocales);

    expect(result.current.selectedLanguage).toEqual([
      { id: 'en-US', title: 'English' },
    ]);
    expect(result.current.languageList).toEqual([
      { id: 'en-US', title: 'English' },
      { id: 'pt-BR', title: 'Português' },
    ]);
  });

  // when confirm the app restart, it should be restarted
  test('ao confirmar o restart do app, ele deve ser reiniciado', () => {
    const { result } = renderHook(useLocales);

    act(() => {
      result.current._handleRestartApp();
    });

    expect(spyRestart).toHaveBeenCalled();
  });

  // when set the language, should open a modal asking if want restart, and should set the chosen language
  test('ao setar o idioma, deve abrir um modal perguntado se deseja reiniciar, e deve setar o idioma escolhido ', async () => {
    const { result } = await renderHook(useLocales);

    const selectedLanguage = [{ id: 'pt-BR', title: 'Português' }];

    act(() => {
      result.current.handleSetLanguage(selectedLanguage);
    });

    expect(spyAlert).toHaveBeenCalledWith(
      enUS.settings.restartTheApp,
      enUS.settings.willRestartNow,
      [
        { text: enUS.general.yes, onPress: result.current._handleRestartApp },
        { text: enUS.general.no },
      ],
    );

    expect(spySetLanguage).toHaveBeenCalledWith(selectedLanguage[0].id);
  });
});

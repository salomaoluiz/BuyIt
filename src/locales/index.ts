import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import * as persist from './persist';
import { hasTranslationAvailable } from './utils';
import enUS from './enUS'; // eslint-disable-line
import ptBR from './ptBR'; // eslint-disable-line

export type AppLocales = 'pt-BR' | 'en-US';

i18n.translations = {
  ['pt-BR']: { ...ptBR },
  ['en-US']: { ...enUS },
};

i18n.defaultLocale = 'pt-BR';
i18n.fallbacks = true;

export const initLocale = async () => {
  const currentLocale = (await persist.getLocale()) as AppLocales;
  if (!currentLocale) {
    i18n.locale =
      RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations))
        ?.languageTag || 'pt-BR';
    return;
  }

  i18n.locale = currentLocale;
};
initLocale();

export const translate = i18n.t;

export const getLanguage = () => i18n.locale;

export const getAvailableLocales = () =>
  Object.keys(i18n.translations) as AppLocales[];

export const translateInLocale = (key: string, locale: AppLocales) =>
  i18n.t(key, { locale });

export const setLanguage = async (language: AppLocales) => {
  const isAvailable = hasTranslationAvailable(language);

  if (!isAvailable) throw new Error('Unavailable language');

  i18n.locale = language;
  await persist.saveLocale(language);
};

export const toCurrency = (number: number) =>
  i18n.toCurrency(number, { unit: translate('general.currency') });
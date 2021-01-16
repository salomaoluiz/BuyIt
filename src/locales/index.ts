import i18n from 'i18n-js';

import * as persist from './persist';
import { hasTranslationAvailable } from './utils';
import enUS from './enUS'; // eslint-disable-line
import ptBR from './ptBR'; // eslint-disable-line

export type AppLocales = 'ptBR' | 'enUS';

i18n.translations = {
  ptBR: { ...ptBR },
  enUS: { ...enUS },
};

i18n.defaultLocale = 'ptBR';

export const init = async () => {
  const currentLocale = (await persist.getLocale()) as AppLocales;
  if (!currentLocale) {
    i18n.locale = 'ptBR';
    return;
  }

  i18n.locale = currentLocale;
};

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

init();

//#region LEGADO - LEGACY

export const _currentLocale: AppLocales = 'ptBR';

const locales: { [key: string]: typeof ptBR } = {
  ptBR,
};

const appLocale = () => {
  const strings = locales[_currentLocale];

  return strings;
};

export const appCurrency = () => {
  const currency = 'R$';

  return currency;
};

//#endregion

export default appLocale;

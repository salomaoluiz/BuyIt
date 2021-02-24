import i18n from 'i18n-js';

export const hasTranslationAvailable = (language: string) =>
  Object.prototype.hasOwnProperty.call(i18n.translations, language);

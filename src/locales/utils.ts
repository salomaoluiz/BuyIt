import i18n from 'i18n-js';

export const hasTranslationAvailable = (language: string) => {
  const isAvailable = Object.prototype.hasOwnProperty.call(
    i18n.translations,
    language,
  );

  return isAvailable;
};

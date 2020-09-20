import ptBR from './ptBR';

export type AppLocales = {
  ptBR: 'ptBR';
};

export const _currentLocale: keyof AppLocales = 'ptBR';

const locales: { [key: string]: typeof ptBR } = {
  ptBR,
};

const appLocale = () => {
  const strings = locales[_currentLocale];

  return strings;
};

export const appCurrency = () => {
  const currency = 'R$';

  return { currency };
};

export default appLocale;

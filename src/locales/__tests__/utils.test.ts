import i18n from 'i18n-js';

import { hasTranslationAvailable } from '@locales/utils';

jest.mock('i18n-js');

describe('Locales - utils', () => {
  i18n.translations = { ['ptBR']: {} };

  test('deve verificar se a tradução existe', () => {
    const isAvailable = hasTranslationAvailable('ptBR');

    expect(isAvailable).toBeTruthy();
  });
});

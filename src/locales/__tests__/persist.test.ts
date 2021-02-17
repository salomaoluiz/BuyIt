import AsyncStorage from '@react-native-community/async-storage';

import { getLocale, saveLocale, storeKey } from '@locales/persist';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Locales - persist', () => {
  const spySetItem = jest.spyOn(AsyncStorage, 'setItem');
  const spyGetItem = jest.spyOn(AsyncStorage, 'getItem');

  // should save the locale in AsyncStorage
  test('deve salvar no AsyncStorage o locale', async () => {
    await saveLocale('en-US');

    expect(spySetItem).toHaveBeenCalledWith(storeKey, 'en-US');
  });

  // should get the item from AsyncStorage
  test('deve obter o item do AsyncStorage', async () => {
    spyGetItem.mockResolvedValue('pt-BR');

    const locale = await getLocale();

    expect(spyGetItem).toHaveBeenCalledWith(storeKey);
    expect(locale).toEqual('pt-BR');
  });
});

import AsyncStorage from '@react-native-community/async-storage';

import { AppLocales } from '@locales';

export const storeKey = 'i18n-locale';

export const saveLocale = async (locale: AppLocales) => {
  await AsyncStorage.setItem(storeKey, locale);
};

export const getLocale = async () => AsyncStorage.getItem(storeKey);

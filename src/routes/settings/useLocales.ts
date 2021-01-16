import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';

import { PaperListData } from '@components/list';
import * as locales from '@locales';

const useLocales = () => {
  const currentLocale = locales.getLanguage() as locales.AppLocales;
  const availableLocales = locales.getAvailableLocales();
  const [languageList, setLanguageList] = useState<PaperListData[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<PaperListData[]>([]);

  useEffect(() => {
    const listLocales = availableLocales.map((language) => ({
      id: language,
      title: locales.translateInLocale('settings.language', language),
    }));

    setLanguageList(listLocales);
  }, []);

  useEffect(() => {
    const currentLanguage = languageList.filter(
      (language) => language.id === currentLocale,
    );

    setSelectedLanguage(currentLanguage);
  }, [currentLocale, languageList]);

  const _handleRestartApp = () => {
    RNRestart.Restart();
  };

  const handleSetLanguage = async (language: PaperListData[]) => {
    Alert.alert(
      locales.translate('settings.restartTheApp'),
      locales.translate('settings.willRestartNow'),
      [
        { text: locales.translate('general.yes'), onPress: _handleRestartApp },
        { text: locales.translate('general.no') },
      ],
    );

    await locales.setLanguage(language[0].id as locales.AppLocales);
  };

  return {
    selectedLanguage,
    languageList,
    handleSetLanguage,
    _handleRestartApp,
  };
};

export default useLocales;

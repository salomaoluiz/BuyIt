import React from 'react';

import Divider from '@components/divider';
import Header from '@components/header';
import List from '@components/list';
import Title from '@components/title';
import { translate } from '@locales';

import { Container } from './styles';
import useLocales from './useLocales';

const Settings = () => {
  const { selectedLanguage, languageList, handleSetLanguage } = useLocales();

  return (
    <>
      <Header title={translate('settings.settings')} drawerButton />
      <Container>
        <Title text={translate('settings.selectTheLanguage')} />
        <List
          data={languageList}
          onPress={handleSetLanguage}
          selectedItems={selectedLanguage}
          checkMode="radiobutton"
        />
      </Container>
      <Divider rowDivider showHorizontalDivider />
    </>
  );
};

export default Settings;

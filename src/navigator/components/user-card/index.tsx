import React from 'react';

import appLocale from '@locales';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import {
  Container,
  UnauthorizedText,
  UserContainer,
  UserName,
  UnauthorizedButton,
} from './styles';
import useUserCard from './useUserCard';

const strings = appLocale();
export interface Props {
  navigation: DrawerNavigationHelpers;
}

const UserCard = (props: Props) => {
  const { isAnonymously, userName, handleLoginPress } = useUserCard(props);

  return (
    <Container>
      {isAnonymously && (
        <UnauthorizedButton onPress={handleLoginPress}>
          <UnauthorizedText>{strings.auth.login}</UnauthorizedText>
        </UnauthorizedButton>
      )}
      {userName && (
        <UserContainer>
          <UserName>{userName}</UserName>
        </UserContainer>
      )}
    </Container>
  );
};

export default UserCard;

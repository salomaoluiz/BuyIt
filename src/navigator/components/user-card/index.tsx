import React from 'react';

import {
  Container,
  UnauthorizedText,
  UserContainer,
  UserName,
  UnauthorizedButton,
} from './styles';
import useUserCard from './useUserCard';
import * as authStrings from '@locales/login';

import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

export interface Props {
  navigation: DrawerNavigationHelpers;
}

const UserCard = (props: Props) => {
  const { isAnonymously, userName, handleLoginPress } = useUserCard(props);

  return (
    <Container>
      {isAnonymously && (
        <UnauthorizedButton onPress={handleLoginPress}>
          <UnauthorizedText>{authStrings.login}</UnauthorizedText>
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

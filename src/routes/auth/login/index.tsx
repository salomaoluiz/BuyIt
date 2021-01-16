import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';

import Logo from '@assets/images/logo.svg';
import Button from '@components/button';
import Divider from '@components/divider';
import FullscreenLoader from '@components/fullscreen-loader';
import Header from '@components/header';
import TextInput from '@components/text-input';
import { translate } from '@locales';
import { UnauthenticatedParamsList } from '@navigator/unauthenticated';
import { dimensions } from '@styles';

import {
  Container,
  LogoContainer,
  InputContainer,
  LoginContainer,
  SocialContainer,
} from './styles';
import useForm from './useForm';
import useLogin from './useLogin';

export type Props = StackScreenProps<UnauthenticatedParamsList, 'Login'>;

const Login = () => {
  const {
    setEmail,
    formParams,
    setPassword,
    handleErrorMessage,
    checkForm,
  } = useForm();
  const { email, password } = formParams;

  const {
    isLoading,
    isAnonymously,
    handleLoginAnonymously,
    handleLoginEmailPassword,
    handleRegisterUser,
  } = useLogin({ checkForm, formParams });

  const shouldShowLoading = isLoading;
  const shouldShowLoginScreen = !isLoading;

  return (
    <>
      <Header
        title={translate('auth.login')}
        hidden={!isAnonymously}
        hiddenStatusBar={!isAnonymously}
        drawerButton
      />
      <Container keyboardShouldPersistTaps="handled">
        {shouldShowLoading && <FullscreenLoader />}

        {shouldShowLoginScreen && (
          <LoginContainer>
            <LogoContainer>
              <Logo height={dimensions.screenWidth / 5} />
            </LogoContainer>
            <InputContainer>
              <TextInput
                label={translate('auth.email')}
                onChangeText={setEmail}
                value={email}
                leftIcon="account"
                error={!!handleErrorMessage('email').error}
                {...handleErrorMessage('email')}
                hasClearButton
              />
              <Divider columnDivider />
              <TextInput
                label={translate('auth.password')}
                onChangeText={setPassword}
                value={password}
                leftIcon="lock"
                secureTextEntry
                error={!!handleErrorMessage('password').error}
                {...handleErrorMessage('password')}
                rightIcon="eye"
              />
              <Divider columnDivider />
              <Button
                uppercase
                title={translate('auth.login')}
                onPress={handleLoginEmailPassword}
                mode="contained"
              />
              <Divider columnDivider />
              <Button
                uppercase
                title={translate('auth.register')}
                onPress={handleRegisterUser}
                mode="contained"
              />
            </InputContainer>

            <Divider columnDivider />
            <SocialContainer>
              {!isAnonymously && (
                <Button
                  mode="text"
                  title={translate('auth.continueWithoutLogin')}
                  onPress={handleLoginAnonymously}
                  uppercase
                />
              )}
            </SocialContainer>
          </LoginContainer>
        )}
      </Container>
    </>
  );
};

export default Login;

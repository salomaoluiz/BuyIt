import * as React from 'react';

import useLogin from './useLogin';
import {
  Container,
  LogoContainer,
  InputContainer,
  LoginContainer,
  SocialContainer,
} from './styles';
import Logo from '@assets/images/logo.svg';
import { dimensions } from '@styles';
import TextInput from '@components/text-input';
import Button from '@components/button';
import { StackScreenProps } from '@react-navigation/stack';
import { UnauthenticatedParamsList } from '@navigator/unauthenticated';
import FullscreenLoader from '@components/fullscreen-loader';
import useForm from './useForm';
import appLocale from '@locales';
import Divider from '@components/divider';
import Header from '@components/header';

const strings = appLocale();

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
        title={strings.auth.login}
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
                label={strings.auth.email}
                onChangeText={setEmail}
                value={email}
                leftIcon="account"
                error={!!handleErrorMessage('email').error}
                {...handleErrorMessage('email')}
                hasClearButton
              />
              <Divider columnDivider />
              <TextInput
                label={strings.auth.password}
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
                title={strings.auth.login}
                onPress={handleLoginEmailPassword}
                mode="contained"
              />
              <Divider columnDivider />
              <Button
                uppercase
                title={strings.auth.register}
                onPress={handleRegisterUser}
                mode="contained"
              />
            </InputContainer>

            <Divider columnDivider />
            <SocialContainer>
              {!isAnonymously && (
                <Button
                  mode="text"
                  title={strings.auth.continueWithoutLogin}
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

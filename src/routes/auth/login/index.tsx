import * as React from 'react';

import useLogin from './useLogin';
import {
  Container,
  Title,
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
    <Container keyboardShouldPersistTaps="handled">
      {shouldShowLoading && <FullscreenLoader />}

      {shouldShowLoginScreen && (
        <LoginContainer>
          <LogoContainer>
            <Logo
              width={dimensions.size.stackXxxlNumber}
              height={dimensions.size.stackXxxlNumber}
            />
            <Title>{strings.auth.welcome}</Title>
          </LogoContainer>
          <InputContainer>
            <TextInput
              title={strings.auth.email}
              onChangeText={setEmail}
              value={email}
              icon="account"
              error={!!handleErrorMessage('email').error}
              {...handleErrorMessage('email')}
            />
            <TextInput
              title={strings.auth.password}
              onChangeText={setPassword}
              value={password}
              icon="lock"
              secureTextEntry
              error={!!handleErrorMessage('password').error}
              {...handleErrorMessage('password')}
            />
            <Button
              title={strings.auth.login}
              onPress={handleLoginEmailPassword}
            />
            <Button
              title={strings.auth.register}
              onPress={handleRegisterUser}
            />
          </InputContainer>

          <SocialContainer>
            {!isAnonymously && (
              <Button
                mode="flat"
                title={strings.auth.continueWithoutLogin}
                onPress={handleLoginAnonymously}
              />
            )}
          </SocialContainer>
        </LoginContainer>
      )}
    </Container>
  );
};

export default Login;

import * as React from 'react';

import TextInput from '@components/text-input';
import { Container } from './styles';
import useRegister from './useRegister';
import Button from '@components/button';
import FullscreenLoader from '@components/fullscreen-loader';
import useForm from './useForm';
import appLocale from '@locales';

const strings = appLocale();

const RegisterUser = () => {
  const {
    setEmail,
    setName,
    setPassword,
    setConfirmPassword,
    checkForm,
    handleErrorMessage,
    formParams,
  } = useForm();
  const { confirmPassword, email, name, password } = formParams;

  const { isLoading, handleRegisterPress } = useRegister({
    formParams,
    checkForm,
  });

  const shouldShowLoading = isLoading;
  const shouldShowScreen = !isLoading;

  return (
    <>
      {shouldShowLoading && <FullscreenLoader />}
      {shouldShowScreen && (
        <Container keyboardShouldPersistTaps="handled">
          <TextInput
            title={strings.auth.name}
            value={name}
            onChangeText={setName}
            error={!!handleErrorMessage('name').error}
            helperText={handleErrorMessage('name').helperText}
            textContentType="name"
          />
          <TextInput
            title={strings.auth.email}
            value={email}
            onChangeText={setEmail}
            error={!!handleErrorMessage('email').error}
            helperText={handleErrorMessage('email').helperText}
            textContentType="emailAddress"
          />
          <TextInput
            title={strings.auth.password}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={!!handleErrorMessage('password').error}
            helperText={handleErrorMessage('password').helperText}
            textContentType="newPassword"
          />
          <TextInput
            title={strings.auth.confirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={!!handleErrorMessage('confirmPassword').error}
            helperText={handleErrorMessage('confirmPassword').helperText}
            textContentType="newPassword"
          />
          <Button
            onPress={handleRegisterPress}
            title={strings.auth.register}
          />
        </Container>
      )}
    </>
  );
};

export default RegisterUser;

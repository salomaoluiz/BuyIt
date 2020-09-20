import * as React from 'react';

import TextInput from '@components/text-input';
import { Container } from './styles';
import useRegister from './useRegister';
import Button from '@components/button';
import * as strings from '@locales/register';
import FullscreenLoader from '@components/fullscreen-loader';
import useForm from './useForm';

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
            title={strings.name}
            value={name}
            onChangeText={setName}
            error={!!handleErrorMessage('name').error}
            helperText={handleErrorMessage('name').helperText}
            textContentType="name"
          />
          <TextInput
            title={strings.email}
            value={email}
            onChangeText={setEmail}
            error={!!handleErrorMessage('email').error}
            helperText={handleErrorMessage('email').helperText}
            textContentType="emailAddress"
          />
          <TextInput
            title={strings.password}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={!!handleErrorMessage('password').error}
            helperText={handleErrorMessage('password').helperText}
            textContentType="newPassword"
          />
          <TextInput
            title={strings.confirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={!!handleErrorMessage('confirmPassword').error}
            helperText={handleErrorMessage('confirmPassword').helperText}
            textContentType="newPassword"
          />
          <Button
            onPress={handleRegisterPress}
            title={strings.registerButton}
          />
        </Container>
      )}
    </>
  );
};

export default RegisterUser;

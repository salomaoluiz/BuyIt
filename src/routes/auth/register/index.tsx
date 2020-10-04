import * as React from 'react';

import TextInput from '@components/text-input';
import { Container } from './styles';
import useRegister from './useRegister';
import Button from '@components/button';
import FullscreenLoader from '@components/fullscreen-loader';
import useForm from './useForm';
import appLocale from '@locales';
import Header from '@components/header';
import Divider from '@components/divider';

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
      <Header title={strings.auth.register} backButton />
      {shouldShowLoading && <FullscreenLoader />}
      {shouldShowScreen && (
        <Container keyboardShouldPersistTaps="handled">
          <TextInput
            label={strings.auth.name}
            value={name}
            onChangeText={setName}
            error={!!handleErrorMessage('name').error}
            helperText={handleErrorMessage('name').helperText}
            textContentType="name"
          />
          <Divider columnDivider />
          <TextInput
            label={strings.auth.email}
            value={email}
            onChangeText={setEmail}
            error={!!handleErrorMessage('email').error}
            helperText={handleErrorMessage('email').helperText}
            textContentType="emailAddress"
          />
          <Divider columnDivider />
          <TextInput
            label={strings.auth.password}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={!!handleErrorMessage('password').error}
            helperText={handleErrorMessage('password').helperText}
            textContentType="newPassword"
          />
          <Divider columnDivider />
          <TextInput
            label={strings.auth.confirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={!!handleErrorMessage('confirmPassword').error}
            helperText={handleErrorMessage('confirmPassword').helperText}
            textContentType="newPassword"
          />
          <Divider columnDivider />
          <Button
            onPress={handleRegisterPress}
            title={strings.auth.register}
            mode="contained"
          />
        </Container>
      )}
    </>
  );
};

export default RegisterUser;

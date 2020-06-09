import React from 'react';
import {
  Container,
  SubContainer,
  ItensContainer,
  TextInputStyled,
  InputContainer,
} from './styles';
import useTextInput from './useTextInput';

import useAnimations from './useAnimations';
import GenericIcon from '@components/icon';
import Prefix from './components/prefix';
import Title from './components/title';
import HelperComponent from './components/helper-text';
import { TextInputProps } from 'react-native';

export interface Props extends TextInputProps {
	icon?: string;
	title: string;
	error?: boolean;
	helperText?: string;
	prefix?: string;
	sufix?: string;
}

const TextInput = (props: Props) => {
  const {
    prefix,
    sufix,
    error,
    value,
    title,
    icon,
    helperText,
    keyboardType,
  } = props;

  const {
    isFocused,
    handleFocused,
    handleChangeText,
    onClearText,
    startWithValue,
    valueText,
  } = useTextInput(props);

  const { titlePosition } = useAnimations({
    isFocused,
    hasPrefix: !!prefix,
    hasValue: !!value,
    startWithValue,
  });

  return (
    <Container>
      <ItensContainer>
        {icon && (
          <GenericIcon isVisible={true} useAnimation={false} name={icon} />
        )}
        <SubContainer>
          <InputContainer isError={error} isFocused={isFocused}>
            <Prefix value={prefix} />
            <Title
              hasPrefix={!!prefix}
              titlePosition={titlePosition}
              value={title}
              isError={error}
              isFocused={isFocused}
            />
            <TextInputStyled
              keyboardType={keyboardType}
              value={valueText}
              onFocus={handleFocused}
              onBlur={handleFocused}
              onChangeText={handleChangeText}
            />
            <Prefix value={sufix} />
          </InputContainer>
        </SubContainer>

        <GenericIcon
          isVisible={isFocused}
          name={'close'}
          onPress={onClearText}
          useAnimation
        />
      </ItensContainer>
      <HelperComponent value={helperText} isError={error} />
    </Container>
  );
};

export default TextInput;

import React from 'react';
import {
  Container,
  SubContainer,
  ItensContainer,
  TextInputStyled,
  InputContainer,
} from './styles';
import useTextInput from './useTextInput';

import GenericIcon from '@components/icon';
import Prefix from './components/prefix';
import HelperComponent from './components/helper-text';
import { TextInputProps, ViewStyle } from 'react-native';
import AnimatedTitle from '@components/animated-title';

export interface Props extends TextInputProps {
  icon?: string;
  title: string;
  error?: boolean;
  helperText?: string;
  prefix?: string;
  sufix?: string;
  containerStyle?: ViewStyle;
}

const TextInput = (props: Props) => {
  const {
    containerStyle,
    prefix,
    sufix,
    error,
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

  return (
    <Container style={containerStyle}>
      <ItensContainer>
        {icon && (
          <GenericIcon isVisible={true} useAnimation={false} name={icon} />
        )}
        <SubContainer>
          <InputContainer isError={error} isFocused={isFocused}>
            <Prefix value={prefix} />
            <AnimatedTitle
              hasPrefix={!!prefix}
              title={title}
              toPosition={{ left: -20, top: -25 }}
              isError={error}
              isFocused={isFocused}
              hasValue={!!valueText}
              startWithValue={startWithValue}
            />
            <TextInputStyled
              {...props}
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
      <HelperComponent hasIcon={!!icon} value={helperText} isError={error} />
    </Container>
  );
};

export default TextInput;

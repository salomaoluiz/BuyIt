import React from 'react';
import { KeyboardType, ViewStyle, TextInputProps } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import HelperComponent from '@components/helper-text';

import AutoComplete, { AutoCompleteData } from './components/auto-complete';
import { Container } from './styles';
import useTextInput from './useTextInput';

export interface Props extends TextInputProps {
  label: string;
  error?: boolean;
  helperText?: string;
  containerStyle?: ViewStyle;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  onChangeText?: (text: string) => void;
  value?: string;
  hasClearButton?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  prefix?: string;
  disabled?: boolean;
  editable?: boolean;
  fixedValue?: string;
  autoCompleteData?: AutoCompleteData[];
  onAutoCompleteItemPress?: (item: AutoCompleteData) => void;
}

const TextInput = (props: Props) => {
  const {
    containerStyle,
    error,
    label,
    helperText,
    keyboardType,
    secureTextEntry,
    leftIcon,
    rightIcon,
    hasClearButton,
    prefix,
    textContentType,
    disabled,
    editable,
    fixedValue,
    onChangeText,
    value,
    autoCompleteData,
    onAutoCompleteItemPress,
  } = props;

  const { isFocused, onClearText, handleFocusStatus } = useTextInput(props);

  const showClearButton = hasClearButton && isFocused;
  const showRightIcon = (!!rightIcon && !isFocused) || !hasClearButton;
  const showLeftButton = !!leftIcon;
  const showPrefix =
    (!!prefix && !!value && !isFocused) ||
    (!!prefix && isFocused) ||
    (!leftIcon && !!prefix);

  return (
    <Container style={containerStyle}>
      <PaperTextInput
        value={fixedValue || value}
        disabled={disabled}
        editable={editable}
        mode="outlined"
        onChangeText={onChangeText}
        label={label}
        clearButtonMode="always"
        error={error}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={handleFocusStatus}
        onBlur={handleFocusStatus}
        textContentType={textContentType}
        left={
          showLeftButton && !showPrefix ? (
            <PaperTextInput.Icon name={leftIcon!} disabled />
          ) : showPrefix ? (
            <PaperTextInput.Affix text={prefix!} />
          ) : undefined
        }
        right={
          showClearButton ? (
            <PaperTextInput.Icon name={'close'} onPress={onClearText} />
          ) : showRightIcon ? (
            <PaperTextInput.Icon name={rightIcon!} disabled />
          ) : undefined
        }
      />
      {autoCompleteData && (
        <AutoComplete
          data={autoCompleteData}
          onItemPress={onAutoCompleteItemPress}
        />
      )}

      <HelperComponent value={helperText} isError={error} />
    </Container>
  );
};

export default TextInput;

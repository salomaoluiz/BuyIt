import { Props } from '.';
import { useState, useCallback } from 'react';

const useTextInput = (props: Props) => {
  const [value, setValue] = useState(props.value || '');
  const [isFocused, setIsFocused] = useState(false);

  const onChangeText = useCallback(
    (valueChange: string) => {
      setValue(valueChange);

      if (props.onChangeText) return props.onChangeText(valueChange);
    },
    [value],
  );

  const handleFocusStatus = useCallback(() => {
    setIsFocused(!isFocused);
  }, [isFocused]);

  const onClearText = useCallback(() => {
    setValue('');
    if (props.onChangeText) return props.onChangeText('');
  }, []);

  return {
    onChangeText,
    onClearText,
    value,
    isFocused,
    handleFocusStatus,
  };
};

export default useTextInput;

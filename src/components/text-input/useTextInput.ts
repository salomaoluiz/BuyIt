import { useState, useCallback } from 'react';

import { Props } from './';

const useTextInput = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocusStatus = useCallback(() => {
    setIsFocused(!isFocused);
  }, [isFocused]);

  const onClearText = () => {
    if (props.onChangeText) return props.onChangeText('');
  };

  return {
    onClearText,
    isFocused,
    handleFocusStatus,
  };
};

export default useTextInput;

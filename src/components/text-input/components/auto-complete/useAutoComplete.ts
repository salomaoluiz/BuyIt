import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import { AutoCompleteData, Props } from '.';

const useAutoComplete = (props: Props) => {
  const [isVisible, setVisible] = useState(false);
  const [_isKeyboardVisible, _setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      setVisible(true);
    }

    if (props.data && props.data.length === 0) {
      setVisible(false);
    }

    if (!_isKeyboardVisible) {
      setVisible(false);
    }
  }, [props.data, _isKeyboardVisible]);

  const _showKeyboard = () => _setKeyboardVisible(true);

  const _dismissKeyboard = () => _setKeyboardVisible(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _showKeyboard,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _dismissKeyboard,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleItemPress = (item: AutoCompleteData) => {
    if (props.onItemPress) {
      props.onItemPress(item);
      setVisible(false);
      Keyboard.dismiss();
    }
  };

  return {
    _isKeyboardVisible,
    _setKeyboardVisible,
    _dismissKeyboard,
    _showKeyboard,
    isVisible,
    handleItemPress,
  };
};

export default useAutoComplete;

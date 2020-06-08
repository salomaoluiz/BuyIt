import { Props } from '.';
import { useState, useCallback } from 'react';

const useTextInput = (props: Props) => {
	const { onChangeText, value } = props;
	const startWithValue = !!value;

	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [valueText, setValueText] = useState<string>(value || '');

	const handleFocused = () => {
		setIsFocused(!isFocused);
	};

	const handleChangeText = useCallback(
		(valueChange: string) => {
			setValueText(valueChange);

			if (onChangeText) return onChangeText(valueChange);
		},
		[value],
	);

	const onClearText = () => {
		setValueText('');
		if (onChangeText) return onChangeText('');
	};

	return {
		isFocused,
		handleFocused,
		handleChangeText,
		onClearText,
		valueText,
		startWithValue,
	};
};

export default useTextInput;

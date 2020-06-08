import * as React from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamsList } from '@navigator';
import * as strings from '@locales/product-list';

import useNewProduct from './useNewProduct';
import { Container, InputContainer } from './styles';
import Button from '@components/button';
import TextInput from '@components/text-input';

export type Props = StackScreenProps<RootStackParamsList, 'NewProduct'>;

const NewProduct = (props: Props) => {
	const {
		amount,
		name,
		qtd,
		setAmount,
		setName,
		setQtd,
		qtdDefault,
		onSaveButtonPress,
	} = useNewProduct(props);

	return (
		<Container>
			<InputContainer>
				<TextInput value={name} title={strings.name} onChangeText={setName} />
				<TextInput
					value={amount}
					icon="currency-usd"
					onChangeText={setAmount}
					title={strings.amount}
					prefix={strings.currentCurrency}
					keyboardType="decimal-pad"
				/>
				<TextInput
					value={qtd}
					title={strings.qtd}
					onChangeText={setQtd}
					icon="cart-outline"
					helperText={`${strings.insertQtd} - ${strings.qtdDefault(
						qtdDefault,
					)}`}
					keyboardType="decimal-pad"
				/>
			</InputContainer>
			<Button title={strings.add} onPress={onSaveButtonPress} />
		</Container>
	);
};

export default NewProduct;

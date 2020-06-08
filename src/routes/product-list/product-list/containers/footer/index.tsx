import React from 'react';
import {
	Container,
	ButtonContainer,
	TextContainer,
	TextSubContainer,
	SubContainer,
	Title,
	Value,
} from './styles';
import CircleButton from '@components/circle-button';

interface Props {
  totalAmount: number;
  totalQtd: number;
  onAddPress: () => void;
}

const Footer = (props: Props) => {
	const { totalAmount, totalQtd, onAddPress } = props;
	return (
		<Container>
			<ButtonContainer>
				<CircleButton icon="plus" onPress={onAddPress} />
			</ButtonContainer>
			<SubContainer>
				<TextContainer>
					<TextSubContainer>
						<Title>Items</Title>
						<Value>{totalQtd}</Value>
					</TextSubContainer>
					<TextSubContainer>
						<Title>Total</Title>
						<Value>R$ {totalAmount}</Value>
					</TextSubContainer>
				</TextContainer>
			</SubContainer>
		</Container>
	);
};

export default Footer;

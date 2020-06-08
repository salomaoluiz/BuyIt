import React from 'react';

import { TouchableNativeFeedback } from 'react-native';
import { Container, Title, Icon, SubContainer, Ripple } from './styles';

interface Props {
  onPress: () => void;
  title: string;
  icon?: string;
}
const Button = (props: Props) => {
	const { onPress, title, icon } = props;
	return (
		<Container>
			<TouchableNativeFeedback onPress={onPress} background={Ripple}>
				<SubContainer hasIcon={!!icon}>
					<Title>{title}</Title>
					{icon && <Icon name={icon} />}
				</SubContainer>
			</TouchableNativeFeedback>
		</Container>
	);
};

export default Button;

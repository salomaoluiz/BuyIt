import React from 'react';
import { HelperContainer, HelperText } from './styles';

interface Props {
  value?: string;
  isError?: boolean;
}
const HelperComponent = (props: Props) => {
	const { value, isError } = props;
	if (!value) return null;
  
	return (
		<HelperContainer>
			<HelperText isError={isError}>{value}</HelperText>
		</HelperContainer>
	);
};

export default HelperComponent;

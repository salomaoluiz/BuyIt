import styled from 'styled-components/native';
import { dimensions, colors } from '@styles';

interface PrefixTextProps {
  color?: string;
}
const PrefixText = styled.Text<PrefixTextProps>`
  color: ${({ color }) => color || colors.list.neutralDark};
`;

const PrefixContainer = styled.View`
  padding: ${dimensions.spacing.inlineXxs};
`;

export { PrefixText, PrefixContainer };

import styled from 'styled-components/native';
import { colors, dimensions } from '@styles';

interface HelperTextProps {
  isError?: boolean;
}
const HelperText = styled.Text<HelperTextProps>`
  color: ${({ isError }) => {
    if (isError) return colors.list.supportDangerMedium;
    return colors.list.neutralDark;
  }};
`;

const HelperContainer = styled.View`
  margin-left: ${dimensions.spacing.inlineLg};
  padding-top: ${`-${dimensions.spacing.inlineXs}`};
`;

export { HelperText, HelperContainer };

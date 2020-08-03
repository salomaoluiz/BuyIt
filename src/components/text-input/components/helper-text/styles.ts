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

interface HelperContainerProps {
  hasIcon: boolean;
}
const HelperContainer = styled.View<HelperContainerProps>`
  margin-left: ${({ hasIcon }) =>
    hasIcon ? dimensions.spacing.inlineLg : dimensions.spacing.none};
  padding-top: ${`-${dimensions.spacing.inlineXs}`};
`;

export { HelperText, HelperContainer };

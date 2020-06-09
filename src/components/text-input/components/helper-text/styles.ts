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
  margin-top: ${`-${dimensions.spacing.inlineXxs}`}
`;

export { HelperText, HelperContainer };

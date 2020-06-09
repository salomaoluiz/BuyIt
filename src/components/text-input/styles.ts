import styled from 'styled-components/native';
import { dimensions, colors } from '@styles';

const Container = styled.View`
  margin-bottom: ${dimensions.spacing.insetXxs};
`;

const SubContainer = styled.View`
  flex: 1;
  padding: ${dimensions.spacing.inlineXxs};
`;

const ItensContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface InputContainerProps {
  isError?: boolean;
  isFocused: boolean;
}

const InputContainer = styled.View<InputContainerProps>`
  flex-direction: row;
  align-items: center;
  border-width: ${dimensions.border.widthThin};
  border-color: ${({ isError, isFocused }) => {
    if (isError) return colors.list.supportDangerMedium;
    if (isFocused) return colors.list.brandPrimaryDark;
    return colors.list.neutralDarkest;
  }};
  background-color: ${colors.list.neutralLight};
  border-radius: ${dimensions.border.radiusXs};
`;

const TextInputStyled = styled.TextInput`
  flex: 1;
`;

export {
  Container,
  SubContainer,
  TextInputStyled,
  InputContainer,
  ItensContainer,
};

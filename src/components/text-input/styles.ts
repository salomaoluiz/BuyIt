import styled from 'styled-components/native';
import { dimensions, colors } from '@styles';

const Container = styled.View`
  margin-top: ${dimensions.spacing.insetSm};
  margin-bottom: ${dimensions.spacing.insetSm};
  margin-right: ${dimensions.spacing.insetXs};
  margin-left: ${dimensions.spacing.insetXs};
  flex:1;
`;

const SubContainer = styled.View`
  flex: 1;
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
  max-height: ${dimensions.size.stackLg};
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

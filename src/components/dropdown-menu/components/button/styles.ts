import styled from 'styled-components/native';
import { dimensions, colors } from '@styles';
import { TouchableNativeFeedback } from 'react-native';

const Button = styled.TouchableNativeFeedback`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;
const Ripple = TouchableNativeFeedback.Ripple(colors.list.neutralDark, true);

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

interface BorderContainerProps {
  isModalVisible: boolean;
}
const BorderContainer = styled.View<BorderContainerProps>`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-width: ${dimensions.border.widthThin};
  border-color: ${({ isModalVisible }) =>
    isModalVisible ? colors.list.brandPrimaryDark : colors.list.neutralDark};
  background-color: ${colors.list.neutralLight};
  border-radius: ${dimensions.border.radiusXs};
`;

const SubContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Value = styled.Text`
  padding: ${dimensions.spacing.inlineXxs};
`;

const IconContainer = styled.View`
  align-self: center;
  padding: ${dimensions.spacing.inlineXxs};
`;

export {
  Ripple,
  SubContainer,
  Container,
  Value,
  IconContainer,
  Button,
  BorderContainer,
};

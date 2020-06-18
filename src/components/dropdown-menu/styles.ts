import styled from 'styled-components/native';
import { dimensions } from '@styles';

interface ContainerProps {
  isModalVisible?: boolean;
}
const Container = styled.View<ContainerProps>`
  margin-top: ${dimensions.spacing.insetSm};
  margin-bottom: ${dimensions.spacing.insetSm};
  margin-right: ${dimensions.spacing.insetXs};
  margin-left: ${dimensions.spacing.insetXs};
  flex: 1;
  max-height: ${dimensions.size.stackLg};
`;
const CustomContainer = styled.TouchableOpacity``;

export { Container, CustomContainer };

import styled from 'styled-components/native';
import { colors, dimensions } from '@styles';

const Container = styled.View`
  flex: 1;
  padding: ${dimensions.spacing.medium};
  background-color: ${colors.backgroundLight};
`;

const ListContainer = styled.ScrollView`  
`;
const FooterContainer = styled.View``;

const ItemContainer = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  border-width: 1px;
  padding: ${dimensions.spacing.small};
  border-radius: ${dimensions.radius.regular};
`;

const ItemText = styled.Text``;

const SubTotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${dimensions.spacing.medium}
`;

const SubTotalText = styled.Text``;

export {
  Container,
  ListContainer,
  FooterContainer,
  ItemContainer,
  ItemText,
  SubTotalContainer,
  SubTotalText,
};

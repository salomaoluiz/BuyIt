import styled from 'styled-components/native';
import { colors, dimensions } from '@styles';

const Container = styled.View`
  flex: 1;
  padding: ${dimensions.size.stackXxxs};
  background-color: ${colors.list.neutralLightest};
`;

const ListContainer = styled.ScrollView``;
const FooterContainer = styled.View``;

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-width: 1px;
  padding: ${dimensions.size.stackXxxs};
  border-radius: ${dimensions.border.radiusXs};
  margin: ${dimensions.size.stackXxxs};
`;

const ItemText = styled.Text``;

const SubTotalContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${dimensions.size.stackXxxs};
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

import styled from 'styled-components/native';
import { colors, dimensions } from '@styles';

const Container = styled.View`
  flex: 1;
  padding: ${dimensions.size.stackXxxs};
  background-color: ${colors.list.neutralMedium};
`;

const ListContainer = styled.ScrollView``;


const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-width: 1px;
  padding: ${dimensions.size.stackXxxs};
  border-radius: ${dimensions.border.radiusXs};
  margin: ${dimensions.size.stackXxxs};
`;

const ItemText = styled.Text``;


export {
	Container,
	ListContainer,

	ItemContainer,
	ItemText,

};

import styled from 'styled-components/native';
import { dimensions, fonts } from '@styles';

export const Container = styled.TouchableOpacity`
  padding: ${dimensions.spacing.inlineXxs};
  margin: ${dimensions.spacing.inlineXs};
  border-width: ${dimensions.border.widthThin};
  flex: 1;
  min-height: ${dimensions.size.stackXxl};
  border-radius: ${dimensions.border.radiusSm};
  justify-content: space-between;
`;

export const ListTitle = styled.Text`
  font-size: ${fonts.size.fontSizeXs};
`;

export const ListItems = styled.Text`
  font-size: ${fonts.size.fontSizeXs};
  align-self: flex-end;
`;
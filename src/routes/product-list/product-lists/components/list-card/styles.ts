import styled from 'styled-components/native';

import { dimensions } from '@styles';

export const Container = styled.TouchableOpacity`
  padding: ${dimensions.spacing.Xs};
  margin: ${dimensions.spacing.Md};
  border-width: ${dimensions.border.widthThin};
  flex: 1;
  min-height: ${dimensions.size.Xl};
  border-radius: ${dimensions.border.radiusSm};
  justify-content: space-between;
`;

export const ListTitle = styled.Text``;

export const ListItems = styled.Text`
  align-self: flex-end;
`;

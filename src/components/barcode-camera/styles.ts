import { RNCamera } from 'react-native-camera';
import styled from 'styled-components/native';

import { dimensions } from '@styles';

export const Container = styled.View`
  flex: 0;
  flex-direction: row;
  justify-content: center;
  background-color: white;
`;

export const CloseContainer = styled.View`
  position: absolute;
  top: ${dimensions.spacing.Xll};
  right: ${dimensions.spacing.Xll};
  border-radius: ${dimensions.border.radiusCircle};
  background-color: white;
`;

export const Camera = styled(RNCamera)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

import React from 'react';
import { BackgroundContainer } from './styles';

interface Props {
  children: JSX.Element[];
  color?: string;
}

const Background = (props: Props) => {
  const { color, children } = props;
  return <BackgroundContainer color={color}>{children}</BackgroundContainer>;
};

export default Background;

import Icon from '@components/icon';
import { RightIcon } from '@components/list';
import { dimensions, getStyleAsNumber } from '@styles';
import React from 'react';

interface Props {
  rightProps: {
    color: string;
    style?:
      | {
          marginRight: number;
          marginVertical?: number | undefined;
        }
      | undefined;
  };
  rightIcon?: RightIcon;
}

const ListRight = (props: Props) => {
  const { rightProps, rightIcon } = props;

  if (!rightIcon) return null;

  return (
    <Icon
      style={{
        marginVertical: getStyleAsNumber(dimensions.spacing.Sm),
        marginRight: getStyleAsNumber(dimensions.spacing.Md),
      }}
      color={rightProps.color}
      isVisible
      name={rightIcon.icon}
      onPress={rightIcon.onPress}
      hitslop
    />
  );
};

export default ListRight;

import { useEffect, useState } from 'react';
import { dimensions } from '@styles';

interface Props {
  position?: { pageX?: number; pageY?: number };
}

const useMenuModal = (props: Props) => {
  const { position } = props;
  const maxHeight = dimensions.screenHeight / 2;

  const [cordsXY, setCordsXY] = useState<
    { X: number; Y: number } | undefined
  >();

  useEffect(() => {
    if (position && position.pageX && position.pageY) {
      const pageX = position.pageX;
      const pageY = position.pageY;
      const isLeft = pageX < dimensions.screenWidth / 2;

      const cordX = isLeft ? pageX : pageX - dimensions.size.stackXXxlNumber;
      const isAfterHalfScreen = pageY > maxHeight;
      const diferencePosition = isAfterHalfScreen
        ? pageY * 2 - maxHeight * 2
        : 50;

      const cordY = pageY - diferencePosition;

      setCordsXY({ X: cordX, Y: cordY });
    }
  }, [position?.pageX, position?.pageY]);

  return {
    cordsXY,
    maxHeight,
  };
};

export default useMenuModal;

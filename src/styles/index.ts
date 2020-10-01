import dimensions from './dimensions';
import animation from './animation';
import theme from './theme';

const getStyleAsNumber = (pxElement: string) => {
  const numberWithoutPX = pxElement.split('px')[0];

  const number = parseInt(numberWithoutPX);
  return number;
};

const fonts = { ...theme.fonts };
const colors = { ...theme.colors };

export { fonts, colors, dimensions, animation, getStyleAsNumber };

import animation from './animation';
import dimensions from './dimensions';
import theme from './theme';

const getStyleAsNumber = (pxElement: string) => {
  const numberWithoutPX = pxElement.split('px')[0];

  const number = parseInt(numberWithoutPX);
  return number;
};

const fonts = { ...theme.fonts };
const colors = { ...theme.colors };

export { fonts, colors, dimensions, animation, getStyleAsNumber };

import appLocale from '@locales';

import { unitList } from '../constants';

const strings = appLocale();

describe('Constants', () => {
  test('as constantes devem ser exatas', () => {
    expect(unitList).toEqual([
      { id: 'un', title: strings.unit.unit },
      { id: 'ml', title: strings.unit.milliliter },
      { id: 'L', title: strings.unit.liter },
      { id: 'g', title: strings.unit.gram },
      { id: 'Kg', title: strings.unit.kilogram },
      { id: 'box', title: strings.unit.box },
      { id: 'pack', title: strings.unit.pack },
      { id: 'can', title: strings.unit.can },
      { id: 'gallon', title: strings.unit.gallon },
    ]);
  });
});

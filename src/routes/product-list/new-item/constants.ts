import appLocale from '@locales';

const strings = appLocale();

const unitList = [
  { id: 'un', value: strings.unit.unit },
  { id: 'ml', value: strings.unit.milliliter },
  { id: 'L', value: strings.unit.liter },
  { id: 'g', value: strings.unit.gram },
  { id: 'Kg', value: strings.unit.kilogram },
  { id: 'box', value: strings.unit.box },
  { id: 'pack', value: strings.unit.pack },
  { id: 'can', value: strings.unit.can },
  { id: 'gallon', value: strings.unit.gallon },
];

export { unitList };

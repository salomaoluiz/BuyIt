import { PaperListData } from '@components/list';
import appLocale from '@locales';

const strings = appLocale();

const unitList: PaperListData[] = [
  { id: 'un', title: strings.unit.unit },
  { id: 'ml', title: strings.unit.milliliter },
  { id: 'L', title: strings.unit.liter },
  { id: 'g', title: strings.unit.gram },
  { id: 'Kg', title: strings.unit.kilogram },
  { id: 'box', title: strings.unit.box },
  { id: 'pack', title: strings.unit.pack },
  { id: 'can', title: strings.unit.can },
  { id: 'gallon', title: strings.unit.gallon },
];

export { unitList };

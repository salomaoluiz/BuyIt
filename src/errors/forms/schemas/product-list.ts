import * as Yup from 'yup';

import { translate } from '@locales';

const productList = Yup.object().shape({
  name: Yup.string()
    .required(translate('errors.general.thisValueIsRequired'))
    .max(100, translate('errors.general.theValueIsMuchLong')),
});

export default productList;

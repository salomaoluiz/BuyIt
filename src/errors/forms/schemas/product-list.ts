import * as Yup from 'yup';
import appLocale from '@locales';

const strings = appLocale();

const productList = Yup.object().shape({
  name: Yup.string()
    .required(strings.errors.general.thisValueIsRequired)
    .max(100, strings.errors.general.theValueIsMuchLong),
});

export default productList;

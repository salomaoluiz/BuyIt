import { errors as productListErrors } from './product-list';

const generalErrors = {
  error: 'Erro',
  invalidValue: 'Valores Inválidos',
  thisValueIsRequired: 'Esse valor é obrigatório',
};

const devErrors = {
  insertRequiredValues:
    'Insira os valores requeridos para essa função funcionar',
};

export default {
  productList: productListErrors,
  devErrors,
  generalErrors,
};

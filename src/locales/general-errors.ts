import { errors as productListErrors } from './product-list';
import { errors as loginErrors } from './login';
import { errors as registerErrors } from './register';

const generalErrors = {
  error: 'Erro',
  invalidValue: 'Valores Inválidos',
  thisValueIsRequired: 'Esse valor é obrigatório',
  opsWeHaveAProblem: "Ops, tivemos um problema",
  tryAgainLater: "Tente novamente mais tarde",
};

const devErrors = {
  insertRequiredValues:
    'Insira os valores requeridos para essa função funcionar',
};

export default {
  productList: productListErrors,
  devErrors,
  login: loginErrors,
  register: registerErrors,
  generalErrors,
};

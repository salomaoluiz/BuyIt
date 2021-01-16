import * as loginErrors from '../__mocks__/login.mock';
import testSchema from '../../testSchema';

describe('Testando a validação do ProductList', () => {
  // should return true if all the values are valid
  test('deve retornar true se todos os valores forem válidos', async () => {
    const mock = {
      email: 'a@a.com',
      password: '123456',
    };

    const result = await testSchema('login', mock);
    expect(result).toEqual(true);
  });

  // should return a array with the errors to empty values and for password too short
  test('deve retornar um array com erros para valores vazios e que a senha é muito curta', async () => {
    const mock = {
      email: '',
      password: '',
    };

    const result = await testSchema('login', mock);

    expect(result).toEqual([
      loginErrors.emailRequired,
      loginErrors.passwordRequired,
      loginErrors.passwordShort,
    ]);
  });
});

import * as loginErrors from '../__mocks__/register.mock';
import testSchema from '../../testSchema';

describe('Testando a validação do ProductList', () => {
  // should return treu if all values are valid
  test('deve retornar true se todos os valores forem válidos', async () => {
    const mock = {
      name: 'aaaa',
      email: 'a@a.com',
      password: '123456',
      confirmPassword: '123456',
    };

    const result = await testSchema('register', mock);
    expect(result).toEqual(true);
  });

  // should return an array with errors to empty values and to password too short
  test('deve retornar um array com erros para valores vazios e que a senha é muito curta', async () => {
    const mock = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    const result = await testSchema('register', mock);

    expect(result).toEqual([
      loginErrors.nameRequired,
      loginErrors.emailRequired,
      loginErrors.passwordRequired,
      loginErrors.passwordShort,
      loginErrors.confirmPasswordRequired,
      loginErrors.confirmPasswordShort,
    ]);
  });

  // should return an array with errors to password not equals
  test('deve retornar um array com erros para senhas não iguais', async () => {
    const mock = {
      name: 'aaa',
      email: 'a@a.com',
      password: '123456',
      confirmPassword: '654321',
    };

    const result = await testSchema('register', mock);

    expect(result).toEqual([loginErrors.passwordNotEqual]);
  });
});

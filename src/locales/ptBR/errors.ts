const errors = {
  general: {
    error: 'Erro',
    insertValidName: 'Insira o nome válido',
    invalidValue: 'Valores Inválidos',
    thisValueIsRequired: 'Esse valor é obrigatório',
    opsWeHaveAProblem: 'Ops, tivemos um problema',
    tryAgainLater: 'Tente novamente mais tarde',
    theValueIsMuchLong: 'O valor é muito longo',
    dateHigherThanToday: 'Data precisa ser maior que hoje',
  },
  productList: {
    insertValidAmount: 'Insira um valor válido',
    invalidValueUseOnlyDot:
      'Valores Inválidos, Use somente ponto para separar casas decimais',
  },
  auth: {
    emailInvalid: 'Insira um email válido.',
    passwordShort: 'Senha muito curta, insira pelo menos 6 caracteres.',
    nameIsRequired: 'O nome é obrigatório',
    emailIsRequired: 'O email é obrigatório',
    passwordIsRequired: 'A senha é obrigatória',
    passwordIsNotEqual: 'As senhas não são iguais',
    emailAlreadyInUse: 'Este email já esta sendo utilizado',
    registerError:
      'Desculpe, tivemos um problema durante o registro, tente novamente mais tarde.',
    weakPassword:
      'Essa senha é muito fraca, tente uma combinação de letras, números e simbolos.',
  },
};

export default errors;

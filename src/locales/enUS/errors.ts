const errors = {
  general: {
    error: `Error`,
    insertValidName: `Insert a valid name`,
    invalidValue: `Invalid values`,
    thisValueIsRequired: `This value is required`,
    opsWeHaveAProblem: `Ops, we have a problem`,
    tryAgainLater: `Try again later`,
    theValueIsMuchLong: `The value is much longer`,
    dateHigherThanToday: 'Due date need be higher than today',
  },
  productList: {
    insertValidAmount: `Insert a valid amount`,
    invalidValueUseOnlyDot: `Invalid values, use only dot to separate the decimal places`,
  },
  auth: {
    emailInvalid: `Insert a valid email`,
    passwordShort: `Password too short, insert leastwise 6 characters`,
    nameIsRequired: `The name is required`,
    emailIsRequired: `The email is required`,
    passwordIsRequired: `The password is required`,
    passwordIsNotEqual: `The passwords are not equal`,
    emailAlreadyInUse: `This email it's already been used`,
    registerError: `Sorry, we have a problem during your register`,
    weakPassword: `This password is too weak, try a combination of letters, numbers and symbols`,
  },
};

export default errors;

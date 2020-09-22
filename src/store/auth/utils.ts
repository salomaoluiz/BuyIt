import appLocale from '@locales';

const strings = appLocale();

export const notificationMessages = {
  registerSuccess: {
    title: strings.auth.registerWithSuccess,
    body: strings.auth.verifyYourEmailToConfirm,
    icon: 'emoticon-excited-outline',
  },
  opsError: (errorMessage: string) => ({
    title: strings.errors.general.opsWeHaveAProblem,
    body: errorMessage,
  }),
};

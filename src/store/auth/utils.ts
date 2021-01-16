import { translate } from '@locales';

export const notificationMessages = {
  registerSuccess: {
    title: translate('auth.registerWithSuccess'),
    body: translate('auth.verifyYourEmailToConfirm'),
    icon: 'emoticon-excited-outline',
  },
  opsError: (errorMessage: string) => ({
    title: translate('errors.general.opsWeHaveAProblem'),
    body: errorMessage,
  }),
};

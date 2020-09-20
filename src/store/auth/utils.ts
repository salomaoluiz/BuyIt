import * as registerStrings from '@locales/register';
import errorsString from '@locales/general-errors';

export const notificationMessages = {
  registerSuccess: {
    title: registerStrings.registerWithSuccess,
    body: registerStrings.verifyYourEmailToConfirm,
    icon: 'emoticon-excited-outline',
  },
  opsError: (errorMessage: string) => ({
    title: errorsString.generalErrors.opsWeHaveAProblem,
    body: errorMessage,
  }),
};

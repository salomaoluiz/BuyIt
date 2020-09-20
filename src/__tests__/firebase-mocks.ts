import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const mockCurrentUser: FirebaseAuthTypes.User = {
  displayName: 'mock',
  email: 'mock@mock.com.br',
  emailVerified: true,
  isAnonymous: false,
  phoneNumber: '11123456789',
  photoURL: null,
  providerData: [],
  metadata: {
    creationTime: '123456789',
  },
  providerId: '123456789',
  uid: '123456789',
  delete: jest.fn(),
  getIdToken: jest.fn(),
  getIdTokenResult: jest.fn(),
  linkWithCredential: jest.fn(),
  reauthenticateWithCredential: jest.fn(),
  reload: jest.fn(),
  sendEmailVerification: jest.fn(),
  toJSON: jest.fn(),
  unlink: jest.fn(),
  updateEmail: jest.fn(),
  updatePassword: jest.fn(),
  updatePhoneNumber: jest.fn(),
  updateProfile: jest.fn(),
};
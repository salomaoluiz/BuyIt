import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export default class DocumentFirestoreBuilder {
  data: () => FirebaseFirestoreTypes.DocumentData = jest
    .fn()
    .mockReturnValue({ value: 'Mock Value' });
  get = jest.fn();
  isEqual = jest.fn();
  id = '123456';
  metadata = { fromCache: false, hasPendingWrites: false, isEqual: jest.fn() };
  ref: any = {
    collection: jest.fn(),
    delete: jest.fn(),
    get: jest.fn(),
    isEqual: jest.fn(),
    onSnapshot: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
  };

  withData(data: FirebaseFirestoreTypes.DocumentData) {
    this.data = () => data;
    return this;
  }

  withId(id: string) {
    this.id = id;
    return this;
  }

  build = (): FirebaseFirestoreTypes.QueryDocumentSnapshot => {
    return {
      data: this.data,
      get: this.get,
      isEqual: this.isEqual,
      id: this.id,
      exists: true,
      metadata: this.metadata,
      ref: this.ref,
    };
  };
}

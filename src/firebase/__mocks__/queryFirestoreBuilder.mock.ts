import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type DocsType = FirebaseFirestoreTypes.QueryDocumentSnapshot<
  FirebaseFirestoreTypes.DocumentData
>[];

export default class QueryFirestoreBuilder {
  docChanges = jest.fn();
  forEach = jest
    .fn()
    .mockImplementation((func) => this.docs.forEach((doc) => func(doc)));
  isEqual = jest.fn();
  metadata = { fromCache: false, hasPendingWrites: false, isEqual: jest.fn() };
  docs: DocsType = [];
  empty = false;
  size = 0;
  query = {
    endAt: jest.fn(),
    endBefore: jest.fn(),
    get: jest.fn(),
    isEqual: jest.fn(),
    limit: jest.fn(),
    limitToLast: jest.fn(),
    onSnapshot: jest.fn(),
    orderBy: jest.fn(),
    startAfter: jest.fn(),
    startAt: jest.fn(),
    where: jest.fn(),
  };

  withDocs(docs: DocsType) {
    this.docs = docs;
    return this;
  }

  withSize(size: number) {
    this.size = size;
    return this;
  }

  withEmpty(empty: boolean) {
    this.empty = empty;
    return this;
  }

  build = (): FirebaseFirestoreTypes.QuerySnapshot => {
    return {
      docChanges: this.docChanges,
      forEach: this.forEach,
      isEqual: this.isEqual,
      docs: this.docs,
      empty: this.empty,
      metadata: this.metadata,
      query: this.query,
      size: this.size,
    };
  };
}

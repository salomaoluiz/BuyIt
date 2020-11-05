import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type ParentType = FirebaseFirestoreTypes.CollectionReference<
  FirebaseFirestoreTypes.DocumentData
>;
type FirestoreType = FirebaseFirestoreTypes.Module;

export default class DocReferenceFirestoreBuilder {
  collection = jest.fn();
  delete = jest.fn();
  get = jest.fn();
  isEqual = jest.fn();
  onSnapshot = jest.fn();
  set = jest.fn();
  update = jest.fn();
  id = '123456';
  parent: any = {};
  path = '';
  firestore: any = {};

  withId(id: string) {
    this.id = id;
    return this;
  }

  withPath(path: string) {
    this.path = path;
    return this;
  }

  withParent(parent: ParentType) {
    this.parent = parent;
    return this;
  }

  withFirestore(firestore: FirestoreType) {
    this.firestore = firestore;
    return this;
  }

  build = (): FirebaseFirestoreTypes.DocumentReference => {
    return {
      collection: this.collection,
      delete: this.delete,
      get: this.get,
      isEqual: this.isEqual,
      onSnapshot: this.onSnapshot,
      set: this.set,
      update: this.update,
      id: this.id,
      parent: this.parent,
      firestore: this.firestore,
      path: this.path,
    };
  };
}

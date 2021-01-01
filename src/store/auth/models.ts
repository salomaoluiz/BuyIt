import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const loginWithEmailPassword = (email: string, password: string) =>
  auth().signInWithEmailAndPassword(email, password);

const registerEmailPassword = (email: string, password: string) =>
  auth().createUserWithEmailAndPassword(email, password);

const logout = async () => {
  await auth().signOut();
};

const deleteAccount = async (currentUser: FirebaseAuthTypes.User) => {
  await currentUser.delete();
};

const sendEmailVerification = async (currentUser: FirebaseAuthTypes.User) => {
  await currentUser.sendEmailVerification();
};

const updateUserProfile = (
  currentUser: FirebaseAuthTypes.User,
  userName?: string,
  photoURL?: string,
) =>
  currentUser.updateProfile({
    displayName: userName,
    photoURL,
  });

export {
  loginWithEmailPassword,
  registerEmailPassword,
  logout,
  sendEmailVerification,
  deleteAccount,
  updateUserProfile,
};

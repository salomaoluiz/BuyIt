import { Alert } from 'react-native';

const useErrorMessage = (title: string, message: string) => {
  Alert.alert(title, message);
};

export { useErrorMessage };

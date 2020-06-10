import { v4 as uuidV4 } from 'react-native-uuid';

const generateUniqueID = () => {
	const id = uuidV4();

	return id;
};

export { generateUniqueID };

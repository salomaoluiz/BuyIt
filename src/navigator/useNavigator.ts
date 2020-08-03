import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelectors } from '@store/auth';
import { generalSelector } from '@store/general';

const useNavigator = () => {
  const { isLoggedIn } = useSelector(authSelectors.getState);
  const { rehydrated } = useSelector(generalSelector.getPersistState);

  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [isRehydrated, setIsRehydrated] = useState(rehydrated);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);

    if (rehydrated) {
      setIsRehydrated(true);
    }
  }, [isLoggedIn, rehydrated]);



  return {
    isAuthenticated,
    isRehydrated,
  };
};

export default useNavigator;

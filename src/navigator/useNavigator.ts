import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelectors } from '@store/auth';
import { generalSelector } from '@store/general';

const useNavigator = () => {
  const isLogged = useSelector(authSelectors.isLogged);
  const isAnonymously = useSelector(authSelectors.isAnonymously);
  const { rehydrated } = useSelector(generalSelector.getPersistState);

  const [isRehydrated, setIsRehydrated] = useState(rehydrated);

  useEffect(() => {
    if (rehydrated) {
      setIsRehydrated(true);
    }
  }, [isLogged, rehydrated]);

  return {
    isAuthenticated: isLogged || isAnonymously,
    isRehydrated,
  };
};

export default useNavigator;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { generalSelector } from '@store/general';

const useNavigator = () => {
  const { rehydrated } = useSelector(generalSelector.getPersistState);

  const [isRehydrated, setIsRehydrated] = useState(rehydrated);

  useEffect(() => {
    if (rehydrated) {
      setIsRehydrated(true);
    }
  }, [rehydrated]);

  return {
    isRehydrated,
  };
};

export default useNavigator;

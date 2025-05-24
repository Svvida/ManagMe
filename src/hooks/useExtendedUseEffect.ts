import { useEffect, useRef } from 'react';

export const useEffectOnce = (callback: () => void, when = true) => {
  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
};

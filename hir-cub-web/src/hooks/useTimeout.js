import { useEffect } from 'react';

// It's NOT a full-functional implementation.
function useTimeout(callback, delay) {
  // eslint-disable-next-line
  useEffect(() => {
    if (delay !== null) {
      let id = setTimeout(callback, delay);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line
  }, [callback]);
}

export default useTimeout;

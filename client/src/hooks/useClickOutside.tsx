import { useEffect, useRef } from 'react';

const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLElement>();

  const handleClickOutside = (e: globalThis.MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);

  return { ref };
};

export default useClickOutside;

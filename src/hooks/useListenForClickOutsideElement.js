import { useEffect } from 'react';

export const useListenForClickOutsideElement = handleClickOutside => {
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};
